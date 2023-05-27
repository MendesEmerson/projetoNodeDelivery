import { Request, Response } from "express";
import { DeliverymanRepository } from "../../repositories/deliveryman/DeliverymanRepository";
import { FindAllDeliveriesService } from "../../services/deliverymanService/FindAllDeliveriesService";

export class FindAllDeliveriesDeliverymanController {
    async handle(request: Request, response: Response) {
        const deliverymanRepository = new DeliverymanRepository()
        const findAllDeliveriesService = new FindAllDeliveriesService(deliverymanRepository)

        const {id_deliveryman} = request

        try {
            if(!id_deliveryman) {
                return response.status(404).json({message: "Invalid Deliveryman id"})
            }

            const deliveries = await findAllDeliveriesService.execute(id_deliveryman)
            
            return response.status(200).json(deliveries)
        } catch (error) {
            return response.status(500).json({message: "Internal server error"})
        }
    }
}