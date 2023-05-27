import { Request, Response } from "express";
import { ClientsRepository } from "../../repositories/clients/ClientsRepository";
import { CreateClientService } from "../../services/clientService/CreateClientService";
import { InvalidClientLoginException } from "../../services/exceptionsHandler/clientsExceptions/InvalidClientLoginException";
import { ClientAlreadyExistException } from "../../services/exceptionsHandler/clientsExceptions/ClientAlreadyExistException";

export class CreateClientController {
    async handle(request: Request, response: Response) {
        const clientsRepository = new ClientsRepository()
        const createClientService = new CreateClientService(clientsRepository)

        const { username, password } = request.body

        try {
            if (!username || !password) {
                throw new InvalidClientLoginException()
            }

            const createClient = await createClientService.execute({
                password,
                username
            })

            return response.status(201).json(createClient)

        } catch (error) {
            if(error instanceof InvalidClientLoginException) {
                return response.status(error.status).json(error)
            } 
            else if(error instanceof ClientAlreadyExistException){
                return response.status(error.status).json(error)
            }
            return response.status(500).json({message: "Internal Server Error"})
        }
    }
}