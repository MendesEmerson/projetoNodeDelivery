import { Request, Response } from "express";
import { ClientsRepository } from "../../repositories/clients/ClientsRepository";
import { FindClientByIdService } from "../../services/clientService/FindClientByIdService";

export class FindClientByIdController {
    async handle(request: Request, response: Response) {
        const clientsRepository = new ClientsRepository()
        const findClientByIdService = new FindClientByIdService(clientsRepository)

        const { id_client } = request

        try {

            if (!id_client) {
                return response.status(404).json({ message: "Client not found" })
            }

            const client = await findClientByIdService.execute(id_client)

            return response.status(200).json(client)
            
        } catch (error) {
            return response.status(500).json({message: "Internal Server Error"})
        }
    }
}