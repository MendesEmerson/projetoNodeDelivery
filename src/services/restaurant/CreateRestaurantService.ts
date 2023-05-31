import { hash } from "bcrypt";
import { RestaurantRepository } from "../../repositories/restaurant/RestaurantRepository";
import { RestaurantAlreadyExistException } from "../exceptionsHandler/restaurantExceptions/RestaurantAlreadyExistException";

interface ICreateRestaurant {
    name: string
    username: string
    password: string
}

export class CreateRestaurantService {
    constructor(private restaurantRepository: RestaurantRepository) { }

    async execute({ name, password, username }: ICreateRestaurant) {


        const existRestaurant = await this.restaurantRepository.findRestaurantByUsername(username)

        if (existRestaurant) {
            throw new RestaurantAlreadyExistException()
        }

        const password_hash = await hash(password, 6)

        const newRestaurant = await this.restaurantRepository.createRestaurant({
            name,
            password: password_hash,
            username
        })

        console.log(newRestaurant)
        
        return newRestaurant
    }
}