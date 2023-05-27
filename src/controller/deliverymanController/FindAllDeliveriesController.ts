import { Request, Response } from "express";
import { DeliverymanRepository } from "../../repositories/deliveryman/DeliverymanRepository";
import { FindAllDeliveriesService } from "../../services/deliverymanService/FindAllDeliveriesService";
import { DeliverymanNotFoundException } from "../../services/exceptionsHandler/deliverymanExceptions/DeliverymanNotFoundException";

export class FindAllDeliveriesDeliverymanController {
    async handle(request: Request, response: Response) {
        const deliverymanRepository = new DeliverymanRepository()
        const findAllDeliveriesService = new FindAllDeliveriesService(deliverymanRepository)

        const {id_deliveryman} = request

        try {
            if(!id_deliveryman) {
                throw new DeliverymanNotFoundException();
            }

            const deliveries = await findAllDeliveriesService.execute(id_deliveryman)
            
            return response.status(200).json(deliveries)
        } catch (error) {
            if(error instanceof DeliverymanNotFoundException){
                return response.status(error.status).json(error)
            }
            return response.status(500).json({message: "Internal server error"})
        }
    }
}