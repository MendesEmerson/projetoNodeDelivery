import { Prisma, Deliveryman, Deliveries } from "@prisma/client";
import { IDeliverymanRepository } from "./DeliverymanRepositoryInterface";
import { prisma } from "../../database/prismaClient";

export class DeliverymanRepository implements IDeliverymanRepository {
    async findDeliverymanByUsername(username: string): Promise<Deliveryman | null> {
        const deliveryman = await prisma.deliveryman.findFirst({
            where: {
                username: {
                    equals: username,
                    mode: "insensitive"
                }
            }
        })
        return deliveryman
    }
    async createDeliveryman({ password, username }: Prisma.DeliverymanCreateInput): Promise<Deliveryman | null> {
        const createDeliveryman = await prisma.deliveryman.create({
            data: {
                password,
                username
            }
        })
        return createDeliveryman
    }

    async findDeliverymanById(deliveryman_id: string): Promise<Deliveryman | null> {
        const deliveryman = await prisma.deliveryman.findUnique({
            where: {
                id: deliveryman_id
            }
        })

        return deliveryman
    }

    async findAllDeliveries(deliveryman_id: string): Promise<Deliveries[] | undefined> {
        const deliveryman = await prisma.clients.findUnique({
            where: {
                id: deliveryman_id
            },
            include: {
                deliveries: true
            }
        })

        return deliveryman?.deliveries
    }

}