import { Request, Response } from "express";
import { ClientsRepository } from "../../repositories/clients/ClientsRepository";
import { CreateClientService } from "../../services/clientService/CreateClientService";
import { InvalidClientLoginException } from "../../services/exceptionsHandler/clientsExceptions/InvalidClientLoginException";
import { ClientAlreadyExistException } from "../../services/exceptionsHandler/clientsExceptions/ClientAlreadyExistException";
import { UncaughtHandlerException } from "../../services/exceptionsHandler/UncaughtHandlerException";

export class CreateClientController {
    async handle(request: Request, response: Response) {
        const clientsRepository = new ClientsRepository()
        const createClientService = new CreateClientService(clientsRepository)

        const { username, password, name } = request.body

        try {
            if (!username || !password || !name) {
                throw new InvalidClientLoginException()
            }

            const createClient = await createClientService.execute({
                password,
                username,
                name
            })

            return response.status(201).json(createClient)

        } catch (error) {
            if(error instanceof InvalidClientLoginException) {
                return response.status(error.status).json(error)
            } 
            else if(error instanceof ClientAlreadyExistException){
                return response.status(error.status).json(error)
            }
            const uncaughtHandlerException = new UncaughtHandlerException()
            return response.status(uncaughtHandlerException.status).json(uncaughtHandlerException)
      }
    }
}