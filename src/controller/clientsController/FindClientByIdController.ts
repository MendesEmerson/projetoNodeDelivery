import { Request, Response } from "express";
import { ClientsRepository } from "../../repositories/clients/ClientsRepository";
import { FindClientByIdService } from "../../services/clientService/FindClientByIdService";
import { ClientNotFoundException } from "../../services/exceptionsHandler/clientsExceptions/ClientNotFoundException";

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
            return response.status(500).json({message: "Internal Server Error"})
        }
    }
}