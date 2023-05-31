import { Items, Prisma, Restaurants } from "@prisma/client";

export interface IRestaurantRepository {
    findRestaurantByUsername(username: string): Promise<Restaurants | null>
    createRestaurant(data: Prisma.RestaurantsCreateInput): Promise<Restaurants>
    createItem(data: Prisma.ItemsCreateInput): Promise<Items>
}