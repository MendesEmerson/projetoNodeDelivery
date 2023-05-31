import { RestaurantRepository } from "../../repositories/restaurant/RestaurantRepository";
import { RestaurantNotFoundException } from "../exceptionsHandler/restaurantExceptions/RestaurantNotFoundException";

interface ICreateItem {
    item_name: string
    category: string
    restaurant_id: string
} 

export class CreateItemRestaurantService {
    constructor(private restaurantRepository: RestaurantRepository) { }

    async execute({ category, item_name, restaurant_id }: ICreateItem) {

        const restaurant = await this.restaurantRepository.findRestaurantById(restaurant_id)

        if (!restaurant) {
            throw new RestaurantNotFoundException()
        }

        const newItem = await this.restaurantRepository.createItem({
            item_name,
            category,
            Restaurants: {
                connect: {
                    id: restaurant.id
                }
            }
        })
        return newItem
    }

}