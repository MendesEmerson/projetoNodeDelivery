import { Prisma, Deliveryman, Deliveries } from "@prisma/client";
import { IDeliverymanRepository } from "./DeliverymanRepositoryInterface";
import { prisma } from "../../database/prismaClient";

export class DeliverymanRepository implements IDeliverymanRepository {

    async updateDeliveriesForDeliveryman(data: Prisma.DeliveriesUpdateInput, where: Prisma.DeliveriesWhereUniqueInput): Promise<Deliveries> {
        const deliveryUpdate = await prisma.deliveries.update({
            data,
            where
        })
        return deliveryUpdate
    }

    async findAllAvailable(): Promise<Deliveries[]> {
        const deliveries = await prisma.deliveries.findMany({
            where: {
                id_deliveryman: null,
                end_at: null
            }
        })

        return deliveries
    }

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