import { Request, Response } from "express";
import { RestaurantRepository } from "../../repositories/restaurant/RestaurantRepository";
import { OpenOrCloseRestaurantService } from "../../services/restaurant/OpenOrCloseRestaurantService";
import { RestaurantNotFoundException } from "../../services/exceptionsHandler/restaurantExceptions/RestaurantNotFoundException";

export class OpenOrCloseRestaurantController {
    async handle(request: Request, response: Response) {
        const restaurantRepository = new RestaurantRepository()
        const openOrCloseRestaurantService = new OpenOrCloseRestaurantService(restaurantRepository)

        const { id_restaurant } = request

        try {
            const attStatusRestaurant = await openOrCloseRestaurantService.execute(id_restaurant)
            response.status(200).json(attStatusRestaurant)
        } catch (error) {
            if(error instanceof RestaurantNotFoundException){
                response.status(error.status).json(error)
            }
        }
    }
}