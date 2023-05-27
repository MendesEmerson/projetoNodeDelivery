import { Request, Response } from "express";
import { ClientsRepository } from "../../repositories/clients/ClientsRepository";
import { CreateDeliveriesService } from "../../services/clientService/CreateDeliveriesService";

export class CreateDeliveryController {
    async handle(request: Request, response: Response) {
        const clientRepository = new ClientsRepository()
        const createDelivery = new CreateDeliveriesService(clientRepository)

        const { id_client } = request
        const { item_name } = request.body

        try {
            if (!id_client) {
                response.status(400).json({ message: "Invalid ID" })
            }

            const newDelivery = await createDelivery.execute({
                id_client,
                item_name
            })

            return response.status(201).json(newDelivery)
        } catch (error) {
            response.status(500).json({message: "Internal server error"})
        }
    }
}