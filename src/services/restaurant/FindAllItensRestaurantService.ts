import { RestaurantRepository } from "../../repositories/restaurant/RestaurantRepository";
import { RestaurantNotFoundException } from "../exceptionsHandler/restaurantExceptions/RestaurantNotFoundException";

export class FindAllItensRestaurantService {
    constructor(private restaurantRepository: RestaurantRepository){}

    async execute(restaurant_id: string){

        const restaurant = await this.restaurantRepository.findRestaurantById(restaurant_id)

        if(!restaurant){
            throw new RestaurantNotFoundException()
        }

        const restaurantItens = await this.restaurantRepository.findAllItensRestaurant(restaurant_id)

        return {restaurant, restaurantItens}
    }
}