import { Request, Response } from "express";
import { DeliverymanRepository } from "../../repositories/deliveryman/DeliverymanRepository";
import { FindAllAvailableService } from "../../services/deliverymanService/FindAllAvailableService";

export class FindAllAvailableController {
    async handle(request: Request, response: Response) {
        const deliverymanRepository = new DeliverymanRepository()
        const findAllAvailable = new FindAllAvailableService(deliverymanRepository)

        try {
            const allAvailable = await findAllAvailable.execute()

            return response.status(200).json(allAvailable)
        } catch (error) {
            return response.status(500).json({ message: "Internal server error" })
        }
    }
}