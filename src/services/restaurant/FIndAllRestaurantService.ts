import { RestaurantRepository } from "../../repositories/restaurant/RestaurantRepository";

export class FindAllRestaurantService {
    constructor(private restaurantRepository: RestaurantRepository){}

    async execute(){
        const allRestaurantsOpen = await this.restaurantRepository.findAllRestaurants()

        return allRestaurantsOpen
    }
}