import { Deliveries, Deliveryman, Prisma } from "@prisma/client";

export interface IDeliverymanRepository {
    createDeliveryman({password, username}: Prisma.DeliverymanCreateInput): Promise< Deliveryman | null>
    findDeliverymanById(deliveryman_id: string): Promise< Deliveryman | null >
    findAllDeliveries(deliveryman_id: string): Promise< Deliveries[] | undefined>
}   