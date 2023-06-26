import { Request, Response } from "express";
import { CartRepository } from "../../repositories/cart/CartRepository";
import { FindOpenCartService } from "../../services/cart/FindOpenCartService";
import { CartNotFoundException } from "../../services/exceptionsHandler/cartExceptions/CartNotFoundException";
import { UncaughtHandlerException } from "../../services/exceptionsHandler/UncaughtHandlerException";

export class FindOpenCartController {
    async handle(request: Request, response: Response) {
        const cartRepository = new CartRepository()
        const findOpenCartService = new FindOpenCartService(cartRepository)

        const { id_client } = request

        try {
            const openCart = await findOpenCartService.execute(id_client)
            return response.status(200).json(openCart)
        } catch (error) {
            if (error instanceof CartNotFoundException) {
                response.status(error.status).json(error)
            } else {
                const uncaughtHandlerException = new UncaughtHandlerException()
                response.status(uncaughtHandlerException.status).json(uncaughtHandlerException)
            }
        }
    }
}