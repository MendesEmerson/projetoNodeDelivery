import { UncaughtHandlerException } from '../../services/exceptionsHandler/UncaughtHandlerException';
import { Request, Response } from "express";
import { AuthenticateRepository } from "../../repositories/authenticate/AuthenticateRepository";
import { AuthenticateClientService } from "../../services/authenticate/AuthenticateClientService";
import { InvalidClientLoginException } from "../../services/exceptionsHandler/clientsExceptions/InvalidClientLoginException";
import { AuthenticateRestaurantService } from '../../services/authenticate/AuthenticateRestaurantService';
import { InvalidRestaurantLoginException } from '../../services/exceptionsHandler/restaurantExceptions/RestaurantInvalidLoginException';

export class AuthenticateRestaurantController {
    async handle(request: Request, response: Response) {
        const authRepository = new AuthenticateRepository()
        const authRestaurantService = new AuthenticateRestaurantService(authRepository)

        const {username, password} = request.body

        try {
            if(!username || !password) {
                throw new InvalidRestaurantLoginException()
            }

            const auth = await authRestaurantService.execute({
                password,
                username
            })

            return response.status(200).json(auth)

        } catch (error) {
            if(error instanceof InvalidRestaurantLoginException) {
                return response.status(error.status).json(error)
            }
            const uncaughtHandlerException = new UncaughtHandlerException()
            return response.status(uncaughtHandlerException.status).json(uncaughtHandlerException)
        }
    }
}