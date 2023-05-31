import { Request, Response } from "express";
import { DeliverymanRepository } from "../../repositories/deliveryman/DeliverymanRepository";
import { DeliverymanNotFoundException } from "../../services/exceptionsHandler/deliverymanExceptions/DeliverymanNotFoundException";
import { UncaughtHandlerException } from "../../services/exceptionsHandler/UncaughtHandlerException";
import { FindAllFinishDeliveriesService } from "../../services/deliveryman/FindAllFinishDeliveriesService";

export class FindAllFinishDeliveriesDeliverymanController {
    async handle(request: Request, response: Response) {
        const deliverymanRepository = new DeliverymanRepository()
        const findAllFinishDeliveriesService = new FindAllFinishDeliveriesService(deliverymanRepository)

        const {id_deliveryman} = request

        try {
            const deliveries = await findAllFinishDeliveriesService.execute(id_deliveryman)
            
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