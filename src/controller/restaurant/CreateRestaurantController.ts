import { Request, Response } from "express";
import { RestaurantRepository } from "../../repositories/restaurant/RestaurantRepository";
import { CreateRestaurantService } from "../../services/restaurant/CreateRestaurantService";
import { UncaughtHandlerException } from "../../services/exceptionsHandler/UncaughtHandlerException";
import { RestaurantAlreadyExistException } from "../../services/exceptionsHandler/restaurantExceptions/RestaurantAlreadyExistException";
import { InvalidCreateTypeException } from "../../services/exceptionsHandler/genericsExceptions/InvalidCreateTypeException";

export class CreateRestaurantController {
    async handle(request: Request, response: Response) {

        const restaurantRepository = new RestaurantRepository()
        const createRestaurantService = new CreateRestaurantService(restaurantRepository)

        const { name, username, password, description } = request.body

        try {
            if (!name || !username || !password || !description) {
                throw new InvalidCreateTypeException()
            }

            const newRestaurant = await createRestaurantService.execute({
                name,
                password,
                username,
                description
            })

            console.log(newRestaurant)

            return response.status(201).json(newRestaurant)
        } catch (error) {
            if (error instanceof InvalidCreateTypeException) {
                return response.status(error.status).json(error)
            } else if (error instanceof RestaurantAlreadyExistException) {
                return response.status(error.status).json(error)
            }
            const uncaughtHandlerException = new UncaughtHandlerException()
            return response.status(uncaughtHandlerException.status).json(uncaughtHandlerException)
        }

    }
}