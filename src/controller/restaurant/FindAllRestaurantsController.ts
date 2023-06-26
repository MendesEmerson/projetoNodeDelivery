import { Request, Response } from "express";
import { RestaurantRepository } from "../../repositories/restaurant/RestaurantRepository";
import { FindAllRestaurantService } from "../../services/restaurant/FIndAllRestaurantService";
import { UncaughtHandlerException } from "../../services/exceptionsHandler/UncaughtHandlerException";

export class FindAllRestaurantController {
    async handle(request: Request, response: Response) {
        const restaurantRepository = new RestaurantRepository()
        const findAllRestaurantService = new FindAllRestaurantService(restaurantRepository)

        try {
            const allRestaurantsOpen = await findAllRestaurantService.execute()
            return response.status(200).json(allRestaurantsOpen)
        } catch (error) {
            const uncaughtHandlerException = new UncaughtHandlerException()
            response.status(uncaughtHandlerException.status).json(uncaughtHandlerException)
        }
    }
}