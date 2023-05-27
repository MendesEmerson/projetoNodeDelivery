import { Clients, Deliveryman } from "@prisma/client";
import { prisma } from "../../database/prismaClient";
import { IAuthenticateRepository } from "./AuthenticateRepositoryInterface";

export class AuthenticateRepository implements IAuthenticateRepository {
    
    async authenticateClient(password: string, username: string): Promise<Clients | null> {
        const client = await prisma.clients.findUnique({
            where: {
                username: username,
            },
        });
        return client
    }

    async authenticateDeliveryman(password: string, username: string): Promise<Deliveryman | null>  {
        const deliveryman = await prisma.deliveryman.findUnique({
            where: {
                username: username,
            },
        });
        return deliveryman
    }

}