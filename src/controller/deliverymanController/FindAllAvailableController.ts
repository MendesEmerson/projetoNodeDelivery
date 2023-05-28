import { Request, Response } from "express";
import { DeliverymanRepository } from "../../repositories/deliveryman/DeliverymanRepository";
import { FindAllAvailableService } from "../../services/deliverymanService/FindAllAvailableService";
import { UncaughtHandlerException } from "../../services/exceptionsHandler/UncaughtHandlerException";

export class FindAllAvailableController {
    async handle(request: Request, response: Response) {
        const deliverymanRepository = new DeliverymanRepository()
        const findAllAvailable = new FindAllAvailableService(deliverymanRepository)

        try {
            const allAvailable = await findAllAvailable.execute()

            return response.status(200).json(allAvailable)
        } catch (error) {
            const uncaughtHandlerException = new UncaughtHandlerException()
            return response.status(uncaughtHandlerException.status).json(uncaughtHandlerException)
      }
    }
}