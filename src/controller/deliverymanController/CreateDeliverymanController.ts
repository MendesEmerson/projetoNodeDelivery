import { Request, Response } from "express";
import { DeliverymanRepository } from "../../repositories/deliveryman/DeliverymanRepository";
import { CreateDeliverymanService } from "../../services/deliverymanService/CreateDeliverymanService";

export class CreateDeliverymanController {
    async handle(request: Request, response: Response) {
        const deliverymanRepository = new DeliverymanRepository()
        const createDeliverymanService = new CreateDeliverymanService(deliverymanRepository)

        const { username, password } = request.body

        try {
            if (!username || !password) {
                return response.status(400).json({ message: "username or password is requerid" })
            }

            const newDeliveryman = await createDeliverymanService.execute({
                password,
                username
            })

            return response.status(201).json(newDeliveryman)
        } catch (error) {
            return response.status(500).json({message: "Internal server error"})
        }
    }
}