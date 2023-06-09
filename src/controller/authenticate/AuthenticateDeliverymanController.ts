import { Request, Response } from "express";
import { AuthenticateRepository } from "../../repositories/authenticate/AuthenticateRepository";
import { AuthenticateDeliverymanService } from "../../services/authenticate/AuthenticateDeliverymanService";
import { InvalidDeliverymanLoginException } from "../../services/exceptionsHandler/deliverymanExceptions/InvalidDeliverymanLoginException";
import { UncaughtHandlerException } from "../../services/exceptionsHandler/UncaughtHandlerException";

export class AuthenticateDeliverymanController {
    async handle (request: Request, response:Response) {
        const authRepository = new AuthenticateRepository()
        const authDeliverymanService = new AuthenticateDeliverymanService(authRepository)

        const {password, username} = request.body

        try {
            if(!username || !password) {
                throw new InvalidDeliverymanLoginException()
            }

            const auth = await authDeliverymanService.execute({
                password,
                username
            })

            return response.status(200).json(auth)
        } catch (error) {
            if(error instanceof InvalidDeliverymanLoginException) {
                return response.status(error.status).json(error)
            }
            const uncaughtHandlerException = new UncaughtHandlerException()
            return response.status(uncaughtHandlerException.status).json(uncaughtHandlerException)
      }
    }
}