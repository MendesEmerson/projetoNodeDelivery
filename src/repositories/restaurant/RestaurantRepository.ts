import { Prisma, Restaurants, Items } from "@prisma/client";
import { IRestaurantRepository } from "./RestaurantRepositoryInteface";
import { prisma } from "../../database/prismaClient";

export class RestaurantRepository implements IRestaurantRepository{
    async findRestaurantByUsername(username: string): Promise<Restaurants | null> {
        const existRestaurant = await prisma.restaurants.findFirst({
            where:{
                username: {
                    equals: username,
                    mode: "insensitive"
                }
            }
        })
        return existRestaurant
    }

    async createRestaurant(data: Prisma.RestaurantsCreateInput): Promise<Restaurants> {
        const restaurant = await prisma.restaurants.create({
            data
        })
        return restaurant
    }
    
    async createItem(data: Prisma.ItemsCreateInput): Promise<Items> {
        const item = await prisma.items.create({
            data
        })
        return item
    }

}