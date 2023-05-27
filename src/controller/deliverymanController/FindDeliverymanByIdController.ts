import { Request, Response } from "express";
import { DeliverymanRepository } from "../../repositories/deliveryman/DeliverymanRepository";
import { FindDeliverymanByIdService } from "../../services/deliverymanService/FindDeliverymanByIdService";

export class FindDeliverymanByIdController {
    async handle(request: Request, response: Response) {
        const deliverymanRepository = new DeliverymanRepository()
        const findDeliverymanById = new FindDeliverymanByIdService(deliverymanRepository)

        const { id_deliveryman } = request

        try {
            if(!id_deliveryman) {
                return response.status(404).json({message: "Deliveryman not found"})
            }

            const deliveryman = await findDeliverymanById.execute(id_deliveryman)

            return response.status(200).json(deliveryman)
        } catch (error) {
            return response.status(500).json({message: "internal server error"})
        }
    }
}