import { Request, Response } from "express";
import { DeliverymanRepository } from "../../repositories/deliveryman/DeliverymanRepository";
import { FindDeliverymanByIdService } from "../../services/deliveryman/FindDeliverymanByIdService";
import { DeliverymanNotFoundException } from "../../services/exceptionsHandler/deliverymanExceptions/DeliverymanNotFoundException";
import { UncaughtHandlerException } from "../../services/exceptionsHandler/UncaughtHandlerException";

export class FindDeliverymanByIdController {
    async handle(request: Request, response: Response) {
        const deliverymanRepository = new DeliverymanRepository()
        const findDeliverymanById = new FindDeliverymanByIdService(deliverymanRepository)

        const { id_deliveryman } = request

        try {
            if(!id_deliveryman) {
                throw new DeliverymanNotFoundException()
            }

            const deliveryman = await findDeliverymanById.execute(id_deliveryman)

            return response.status(200).json(deliveryman)
        } catch (error) {
            if(error instanceof DeliverymanNotFoundException) {
                return response.status(error.status).json(error)
            }
            const uncaughtHandlerException = new UncaughtHandlerException()
            return response.status(uncaughtHandlerException.status).json(uncaughtHandlerException)
      }
    }
}