import { RestaurantRepository } from "../../repositories/restaurant/RestaurantRepository";
import { RestaurantNotFoundException } from "../exceptionsHandler/restaurantExceptions/RestaurantNotFoundException";

export class OpenOrCloseRestaurantService {
    constructor(private restaurantRepository: RestaurantRepository) { }

    async execute(restaurant_id: string) {
        const restaurantInfo = await this.restaurantRepository.findRestaurantById(restaurant_id)

        if(!restaurantInfo) {
            throw new RestaurantNotFoundException()
        }

        const attStatusRestaurant = await this.restaurantRepository.updateRestaurantById(
            restaurant_id,
            {
                isOpen: !restaurantInfo.isOpen
            }
        )
        
        return attStatusRestaurant
    }
}