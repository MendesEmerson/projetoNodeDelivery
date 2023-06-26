import { Request, Response } from "express";
import { ClientsRepository } from "../../repositories/clients/ClientsRepository";
import { CreateDeliveriesService } from "../../services/clients/CreateDeliveriesService";
import { ClientNotFoundException } from "../../services/exceptionsHandler/clientsExceptions/ClientNotFoundException";
import { UncaughtHandlerException } from "../../services/exceptionsHandler/UncaughtHandlerException";
import { CartRepository } from "../../repositories/cart/CartRepository";

export class CreateDeliveryController {
    async handle(request: Request, response: Response) {
        const clientRepository = new ClientsRepository()
        const cartRepository = new CartRepository
        const createDelivery = new CreateDeliveriesService(clientRepository, cartRepository)

        const { id_client } = request


        try {
            if (!id_client) {
                throw new ClientNotFoundException()
            }

            const newDelivery = await createDelivery.execute({
                id_client
            })

            return response.status(201).json(newDelivery)
        } catch (error) {
            if (error instanceof ClientNotFoundException) {
                return response.status(error.status).json(error)
            }
            const uncaughtHandlerException = new UncaughtHandlerException()
            return response.status(uncaughtHandlerException.status).json(uncaughtHandlerException)
        }
    }
}