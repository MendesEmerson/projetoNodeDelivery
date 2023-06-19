import { Request, Response } from "express";
import { CartRepository } from "../../repositories/cart/CartRepository";
import { DeleteItemToCartService } from "../../services/cart/DeleteItemToCartService";
import { ClientsRepository } from "../../repositories/clients/ClientsRepository";
import { ClientNotFoundException } from "../../services/exceptionsHandler/clientsExceptions/ClientNotFoundException";
import { ItemNotFoundException } from "../../services/exceptionsHandler/itemsExceptions/ItemNotFoundException";
import { UncaughtHandlerException } from "../../services/exceptionsHandler/UncaughtHandlerException";

export class DeleteItemToCartController {
    async handle(request: Request, response: Response) {
        const clientRepository = new ClientsRepository()
        const cartRepository = new CartRepository()
        const deleteItemToCartService = new DeleteItemToCartService(clientRepository, cartRepository)

        const { id_client } = request
        const { item_id } = request.params

        try {
            const deleteItem = deleteItemToCartService.execute({
                client_id: id_client,
                item_id
            })

            return response.status(204).json()
        } catch (error) {
            if (error instanceof ClientNotFoundException) {
                response.status(error.status).json(error)
            } else if (error instanceof ItemNotFoundException) {
                response.status(error.status).json(error)
            } else {
                const uncaughtHandlerException = new UncaughtHandlerException()
                response.status(uncaughtHandlerException.status).json(uncaughtHandlerException)
            }
        }
    }
}