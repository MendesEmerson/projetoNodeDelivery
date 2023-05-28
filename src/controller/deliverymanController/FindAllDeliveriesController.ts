import { Request, Response } from "express";
import { DeliverymanRepository } from "../../repositories/deliveryman/DeliverymanRepository";
import { FindAllDeliveriesService } from "../../services/deliverymanService/FindAllDeliveriesService";
import { DeliverymanNotFoundException } from "../../services/exceptionsHandler/deliverymanExceptions/DeliverymanNotFoundException";
import { UncaughtHandlerException } from "../../services/exceptionsHandler/UncaughtHandlerException";

export class FindAllDeliveriesDeliverymanController {
    async handle(request: Request, response: Response) {
        const deliverymanRepository = new DeliverymanRepository()
        const findAllDeliveriesService = new FindAllDeliveriesService(deliverymanRepository)

        const {id_deliveryman} = request

        try {
            const deliveries = await findAllDeliveriesService.execute(id_deliveryman)
            
            return response.status(200).json(deliveries)
        } catch (error) {
            if(error instanceof DeliverymanNotFoundException){
                return response.status(error.status).json(error)
            }
            const uncaughtHandlerException = new UncaughtHandlerException()
            return response.status(uncaughtHandlerException.status).json(uncaughtHandlerException)
      }
    }
}