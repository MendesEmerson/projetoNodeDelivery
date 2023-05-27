import { Request, Response } from "express";
import { AuthenticateRepository } from "../../repositories/authenticate/AuthenticateRepository";
import { AuthenticateClientService } from "../../services/authenticateService/AuthenticateClientService";
import { InvalidClientLoginException } from "../../services/exceptionsHandler/clientsExceptions/InvalidClientLoginException";

export class AuthenticateClientController {
    async handle(request: Request, response: Response) {
        const authRepository = new AuthenticateRepository()
        const authClientService = new AuthenticateClientService(authRepository)

        const {username, password} = request.body

        try {
            if(!username || !password) {
                throw new InvalidClientLoginException()
            }

            const auth = await authClientService.execute({
                password,
                username
            })

            return response.status(200).json(auth)

        } catch (error) {
            if(error instanceof InvalidClientLoginException) {
                return response.status(error.status).json(error)
            }
            return response.status(500).json({message: "Internal Server Error"})
        }
    }
}