import { Request, Response } from "express";
import { ClientsRepository } from "../../repositories/clients/ClientsRepository";
import { FindClientByIdService } from "../../services/clients/FindClientByIdService";
import { ClientNotFoundException } from "../../services/exceptionsHandler/clientsExceptions/ClientNotFoundException";
import { UncaughtHandlerException } from "../../services/exceptionsHandler/UncaughtHandlerException";

export class FindClientByIdController {
    async handle(request: Request, response: Response) {
        const clientsRepository = new ClientsRepository()
        const findClientByIdService = new FindClientByIdService(clientsRepository)

        const { id_client } = request

        try {

            if (!id_client) {
                throw new ClientNotFoundException();
            }

            const client = await findClientByIdService.execute(id_client)

            return response.status(200).json(client)
            
        } catch (error) {
            if(error instanceof ClientNotFoundException) {
                return response.status(error.status).json(error)
            }
            const uncaughtHandlerException = new UncaughtHandlerException()
            return response.status(uncaughtHandlerException.status).json(uncaughtHandlerException)
      }
    }
}