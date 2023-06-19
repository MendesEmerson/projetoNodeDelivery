import { Prisma, Restaurants, Items } from "@prisma/client";
import { IRestaurantRepository } from "./RestaurantRepositoryInteface";
import { prisma } from "../../database/prismaClient";

export class RestaurantRepository implements IRestaurantRepository {
    
    async findAllRestaurants(): Promise<Restaurants[] | null> {
        const restaurants = await prisma.restaurants.findMany({
            where: {
                isOpen: true
            }
        })
        return restaurants
    }


    async findItemById(item_id: string): Promise<Items | null> {
        const item = await prisma.items.findUnique({
            where: {
                id: item_id
            },
            include: {
                Restaurants: true
            }
        })
        return item
    }

    async findAllItensRestaurant(restaurant_id: string): Promise<Items[]> {
        const restaurant = await prisma.items.findMany({
            where: {
                restaurantsId: restaurant_id
            }
        })

        return restaurant
    }

    async findRestaurantById(restaurant_id: string): Promise<Restaurants | null> {
        const restaurant = await prisma.restaurants.findUnique({
            where: {
                id: restaurant_id
            }
        })
        return restaurant
    }

    async findRestaurantByUsername(username: string): Promise<Restaurants | null> {
        const existRestaurant = await prisma.restaurants.findFirst({
            where: {
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