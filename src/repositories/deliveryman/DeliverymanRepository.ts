import { Prisma, Deliveryman, Deliveries } from "@prisma/client";
import { IDeliverymanRepository } from "./DeliverymanRepositoryInterface";
import { prisma } from "../../database/prismaClient";

interface IUpdateDeliveries {
    delivery_id: string
    deliveryman_id: string
}


interface IUpdateDeliveriesEnd {
    delivery_id: string
    date: string
}

export class DeliverymanRepository implements IDeliverymanRepository {
    async findAllFinishDeliveries(deliveryman_id: string): Promise<Deliveries[] | undefined> {
        const deliveries = await prisma.deliveries.findMany({
            where: {
                id_deliveryman: deliveryman_id,
                end_at: { not: null }
            },
            include: {
                client: {
                    select: {
                        name: true
                    }
                }
            }
        })

        return deliveries

    }

    async updateDeliveriesEndDate({ delivery_id, date }: IUpdateDeliveriesEnd): Promise<Deliveries> {
        const deliveryUpdate = await prisma.deliveries.update({
            where: {
                id: delivery_id,
            },
            data: {
                end_at: date,
            },
            include: {
                client: {
                    select: {
                        name: true
                    }
                }
            }
        })
        return deliveryUpdate
    }

    async updateDeliveriesForDeliveryman({ delivery_id, deliveryman_id }: IUpdateDeliveries): Promise<Deliveries> {
        const deliveryUpdate = await prisma.deliveries.update({
            where: {
                id: delivery_id
            },
            data: {
                id_deliveryman: deliveryman_id
            },
            include: {
                client: {
                    select: {
                        name: true
                    }
                }
            }
        })
        return deliveryUpdate
    }

    async findAllAvailable(): Promise<Deliveries[]> {
        const deliveries = await prisma.deliveries.findMany({
            where: {
                id_deliveryman: null,
                end_at: null
            },
            include: {
                client: {
                    select: {
                        name: true
                    }
                }
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
    async createDeliveryman({ password, username, name }: Prisma.DeliverymanCreateInput): Promise<Deliveryman | null> {
        const createDeliveryman = await prisma.deliveryman.create({
            data: {
                password,
                username,
                name
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
        const deliveries = await prisma.deliveries.findMany({
            where: {
                id_deliveryman: deliveryman_id,
                end_at: null
            },
            include: {
                client: {
                    select: {
                        name: true
                    }
                }
            }
        })

        return deliveries
    }

}