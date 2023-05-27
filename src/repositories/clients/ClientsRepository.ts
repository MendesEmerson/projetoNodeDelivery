import { Prisma, Clients, Deliveries } from "@prisma/client";
import { IClientsRepository } from "./ClientsRepositoryInterface";
import { prisma } from "../../database/prismaClient";

export class ClientsRepository implements IClientsRepository {
    async findClientByUsername(username: string): Promise<Clients | null> {
        const clientExist = await prisma.clients.findFirst({
            where: {
                username: {
                    equals: username,
                    mode: "insensitive",
                },
            },
        });

        return clientExist
    }

    async createClient({ password, username }: Prisma.ClientsCreateInput): Promise<Clients> {
        const client = await prisma.clients.create({
            data: {
                password,
                username
            }
        })

        return client
    }

    async findClientById(client_id: string): Promise<Clients | null> {
        const client = await prisma.clients.findUnique({
            where: {
                id: client_id
            }
        })

        return client
    }

    async findAllDeliveries(client_id: string): Promise<Deliveries[] | undefined> {
        const client = await prisma.clients.findUnique({
            where: {
                id: client_id
            },
            include: {
                deliveries: true
            }
        })

        return client?.deliveries
    }

}