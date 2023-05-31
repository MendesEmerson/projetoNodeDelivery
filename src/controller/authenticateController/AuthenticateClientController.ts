import { UncaughtHandlerException } from './../../services/exceptionsHandler/UncaughtHandlerException';
import { Request, Response } from "express";
import { AuthenticateRepository } from "../../repositories/authenticate/AuthenticateRepository";
import { AuthenticateClientService } from "../../services/authenticate/AuthenticateClientService";
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
            const uncaughtHandlerException = new UncaughtHandlerException()
            return response.status(uncaughtHandlerException.status).json(uncaughtHandlerException)
        }
    }
}