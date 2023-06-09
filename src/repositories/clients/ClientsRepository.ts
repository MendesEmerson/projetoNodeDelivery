import { Prisma, Clients, Deliveries, Cart, Items } from "@prisma/client";
import { IClientsRepository } from "./ClientsRepositoryInterface";
import { prisma } from "../../database/prismaClient";

export class ClientsRepository implements IClientsRepository {

    async findAllAcceptedDeliveries(client_id: string): Promise<Deliveries[] | undefined> {
        const deliveries = await prisma.deliveries.findMany({
            where: {
                id_client: client_id,
                id_deliveryman: { not: null },
            },
            include: {
                deliveryman: {
                    select: {
                        name: true
                    }
                }
            }
        })
        return deliveries
    }

    async createDelivery(data: Prisma.DeliveriesCreateInput): Promise<Deliveries> {
        const createDelivery = await prisma.deliveries.create({
            data
        })
        return createDelivery
    }

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

    async createClient(data: Prisma.ClientsCreateInput): Promise<Clients> {
        const client = await prisma.clients.create({
            data
        })

        return client
    }

    async findClientById(client_id: string): Promise<Clients | null> {
        const client = await prisma.clients.findUnique({
            where: {
                id: client_id
            },
            include: {
                cart: true
            }
        });

        return client;
    }

    async findAllDeliveries(client_id: string): Promise<Deliveries[] | undefined> {
        const deliveries = await prisma.deliveries.findMany({
            where: {
                id_client: client_id,
                id_deliveryman: null,
            },
            include: {
                deliveryman: {
                    select: {
                        name: true
                    }
                }
            }
        })

        return deliveries
    }

}