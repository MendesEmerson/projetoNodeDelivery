import { Request, Response } from "express";
import { ClientsRepository } from "../../repositories/clients/ClientsRepository";
import { CreateClientService } from "../../services/clientService/CreateClientService";

export class CreateClientController {
    async handle(request: Request, response: Response) {
        const clientsRepository = new ClientsRepository()
        const createClientService = new CreateClientService(clientsRepository)

        const { username, password } = request.body

        try {
            if (!username || !password) {
                return response.status(400).json({ message: "Os campos Username e Password são obrigatórios" })
            }

            const createClient = await createClientService.execute({
                password,
                username
            })

            return response.status(201).json(createClient)

        } catch (error) {
            return response.status(500).json({message: "Internal Server Error"})
        }
    }
}