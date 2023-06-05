import { Request, Response } from "express";
import { RestaurantRepository } from "../../repositories/restaurant/RestaurantRepository";
import { CreateItemRestaurantService } from "../../services/restaurant/CreateItemRestaurantService";
import { RestaurantNotFoundException } from "../../services/exceptionsHandler/restaurantExceptions/RestaurantNotFoundException";
import { UncaughtHandlerException } from "../../services/exceptionsHandler/UncaughtHandlerException";
import { InvalidCreateTypeException } from "../../services/exceptionsHandler/genericsExceptions/InvalidCreateTypeException";

export class CreateItemRestaurantController {
    async handle(request: Request, response: Response) {
        const restaurantRepository = new RestaurantRepository()
        const createItemRestaurantService = new CreateItemRestaurantService(restaurantRepository)

        const { id_restaurant } = request
        const { category, item_name, description, price } = request.body

        try {
            if (!category || !item_name || !description || !price) {
                throw new InvalidCreateTypeException()
            }

            const newItem = createItemRestaurantService.execute({
                category,
                item_name,
                description,
                price,
                restaurant_id: id_restaurant
            })

            return response.status(201).json(newItem)
        } catch (error) {
            if (error instanceof RestaurantNotFoundException) {
                return response.status(error.status).json(error)
            } else if (error instanceof InvalidCreateTypeException) {
                return response.status(error.status).json(error)
            }
            const uncaughtHandlerException = new UncaughtHandlerException()
            response.status(uncaughtHandlerException.status).json(uncaughtHandlerException)
        }
    }
}