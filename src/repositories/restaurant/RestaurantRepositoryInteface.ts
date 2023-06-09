import { Items, Prisma, Restaurants } from "@prisma/client";

export interface IRestaurantRepository {
    findAllItensRestaurant(restaurant_id: string): Promise<Items[] | null>
    findItemById(item_id: string): Promise<Items | null>
    findAllRestaurants(): Promise<Restaurants[] | null>
    findRestaurantById(restaurant_id: string): Promise<Restaurants | null>
    findRestaurantByUsername(username: string): Promise<Restaurants | null>
    createRestaurant(data: Prisma.RestaurantsCreateInput): Promise<Restaurants>
    createItem(data: Prisma.ItemsCreateInput): Promise<Items>
}