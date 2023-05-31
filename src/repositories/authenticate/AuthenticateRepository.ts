import { Clients, Deliveryman, Restaurants } from "@prisma/client";
import { prisma } from "../../database/prismaClient";
import { IAuthenticateRepository } from "./AuthenticateRepositoryInterface";

export class AuthenticateRepository implements IAuthenticateRepository {
    async authenticateRestaurant(username: string): Promise<Restaurants | null> {
        const restaurant = await prisma.restaurants.findFirst({
            where:{
                username:{
                    equals: username,
                    mode: "insensitive"
                }
            }
        })
        return restaurant
    }
    
    async authenticateClient(username: string): Promise<Clients | null> {
        const client = await prisma.clients.findFirst({
            where: {
                username : {
                    equals: username,
                    mode: "insensitive"
                }
            },
        });
        return client
    }

    async authenticateDeliveryman(username: string): Promise<Deliveryman | null>  {
        const deliveryman = await prisma.deliveryman.findFirst({
            where: {
                username : {
                    equals: username,
                    mode: "insensitive"
                }
            },
        });
        return deliveryman
    }

}