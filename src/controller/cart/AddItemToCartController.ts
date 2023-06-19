import { Request, Response } from "express";
import { CartRepository } from "../../repositories/cart/CartRepository";
import { AddItemToCartService } from "../../services/cart/AddItemToCartService";
import { ClientsRepository } from "../../repositories/clients/ClientsRepository";
import { RestaurantRepository } from "../../repositories/restaurant/RestaurantRepository";
import { ClientNotFoundException } from "../../services/exceptionsHandler/clientsExceptions/ClientNotFoundException";
import { UncaughtHandlerException } from "../../services/exceptionsHandler/UncaughtHandlerException";
import { ItemNotFoundException } from "../../services/exceptionsHandler/itemsExceptions/ItemNotFoundException";

export class AddItemToCartController {
    async handle(request: Request, response: Response) {
        const clientRepository = new ClientsRepository()
        const restaurantRepository = new RestaurantRepository()
        const cartRepository = new CartRepository()
        const addItemToCartService = new AddItemToCartService(clientRepository, restaurantRepository, cartRepository)

        const { id_client } = request
        const { item_id } = request.params

        try {
            const addItem = await addItemToCartService.execute({
                client_id: id_client,
                item_id
            })
            return response.status(200).json(addItem)
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
