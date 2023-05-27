import { Request, Response } from "express";
import { DeliverymanRepository } from "../../repositories/deliveryman/DeliverymanRepository";
import { UpdateDeliveriesForDeliverymanService } from "../../services/deliverymanService/UpdateDeliveriesForDeliveryman";
import { DeliverymanNotFoundException } from "../../services/exceptionsHandler/deliverymanExceptions/DeliverymanNotFoundException";

export class UpdateDeliveriesForDeliverymanController {
    async handle(request: Request, response: Response) {
        const deliverymanRepository = new DeliverymanRepository()
        const updateDeliveriesnForDeliveryman = new UpdateDeliveriesForDeliverymanService(deliverymanRepository)

        const { id_deliveryman } = request
        const { id_deliveries } = request.params

        try {
          const updateDeliveries = await updateDeliveriesnForDeliveryman.execute({
            delivery_id: id_deliveries,
            deliveryman_id: id_deliveryman
          })

          return response.status(200).json(updateDeliveries)
        } catch (error) {
            if(error instanceof DeliverymanNotFoundException) {
                response.status(error.status).json(error)
            }
            response.status(500).json({message: "Internal server error"})
            
        }
    }
}