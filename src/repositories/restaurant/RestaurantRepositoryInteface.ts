import { Items, Prisma, Restaurants } from "@prisma/client";

export interface IRestaurantRepository {
    createRestaurant(data: Prisma.RestaurantsCreateInput): Promise<Restaurants>
    createItem(data: Prisma.ItemsCreateInput): Promise<Items>
}