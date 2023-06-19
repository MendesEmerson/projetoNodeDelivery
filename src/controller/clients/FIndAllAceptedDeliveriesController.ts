import { Request, Response } from "express";
import { ClientsRepository } from "../../repositories/clients/ClientsRepository";
import { ClientNotFoundException } from "../../services/exceptionsHandler/clientsExceptions/ClientNotFoundException";
import { UncaughtHandlerException } from "../../services/exceptionsHandler/UncaughtHandlerException";
import { FindAllAcceptedDeliveriesClientService } from "../../services/clients/findAllAcceptedDeliveriesService";

export class FindAllAcceptedDeliveriesController {
    async handle(request: Request, response: Response) {
        const clientsRepository = new ClientsRepository()
        const findAllAcceptedDeliveries = new FindAllAcceptedDeliveriesClientService(clientsRepository)

        const {id_client} = request

        try {
            if(!id_client) {
                throw new ClientNotFoundException();
            }
            const clientDeliveries = await findAllAcceptedDeliveries.execute(id_client)

            return response.status(200).json(clientDeliveries)

        } catch (error) {
            if(error instanceof ClientNotFoundException) {
                return response.status(error.status).json(error)
            }
            const uncaughtHandlerException = new UncaughtHandlerException()
            return response.status(uncaughtHandlerException.status).json(uncaughtHandlerException)
      }
    }
}