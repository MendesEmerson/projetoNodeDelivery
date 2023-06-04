import { Request, Response } from "express";
import { RestaurantRepository } from "../../repositories/restaurant/RestaurantRepository";
import { FindAllItensRestaurantService } from "../../services/restaurant/FindAllItensRestaurantService";
import { RestaurantNotFoundException } from "../../services/exceptionsHandler/restaurantExceptions/RestaurantNotFoundException";
import { UncaughtHandlerException } from "../../services/exceptionsHandler/UncaughtHandlerException";

export class FindAllItensRestaurantController {
    async handle(request: Request, response: Response) {
        const restaurantRepository = new RestaurantRepository()
        const findAllItensRestaurantService = new FindAllItensRestaurantService(restaurantRepository)

        const { restaurant_id } = request.params

        try {
            const itensRestaurant = await findAllItensRestaurantService.execute(restaurant_id)
            response.status(200).json(itensRestaurant)
        } catch (error) {
            if (error instanceof RestaurantNotFoundException) {
                return response.status(error.status).json(error)
            }
            const uncaughtHandlerException = new UncaughtHandlerException()
            response.status(uncaughtHandlerException.status).json(uncaughtHandlerException)
        }
    }
}