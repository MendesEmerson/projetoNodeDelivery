import { Request, Response } from "express";
import { ClientsRepository } from "../../repositories/clients/ClientsRepository";
import { CreateDeliveriesService } from "../../services/clientService/CreateDeliveriesService";
import { ClientNotFoundException } from "../../services/exceptionsHandler/clientsExceptions/ClientNotFoundException";
import { UncaughtHandlerException } from "../../services/exceptionsHandler/UncaughtHandlerException";

export class CreateDeliveryController {
    async handle(request: Request, response: Response) {
        const clientRepository = new ClientsRepository()
        const createDelivery = new CreateDeliveriesService(clientRepository)

        const { id_client } = request
        const { item_name } = request.body

        try {
            if (!id_client) {
               throw new ClientNotFoundException()
            }

            const newDelivery = await createDelivery.execute({
                id_client,
                item_name
            })

            return response.status(201).json(newDelivery)
        } catch (error) {
            if(error instanceof ClientNotFoundException) {
                return response.status(error.status).json(error)
            }
            const uncaughtHandlerException = new UncaughtHandlerException()
            return response.status(uncaughtHandlerException.status).json(uncaughtHandlerException)
       }
    }
}