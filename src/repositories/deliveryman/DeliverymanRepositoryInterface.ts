import { Deliveries, Deliveryman, Prisma } from "@prisma/client";

export interface IDeliverymanRepository {

    createDeliveryman({ password, username }: Prisma.DeliverymanCreateInput): Promise<Deliveryman | null>

    findDeliverymanById(deliveryman_id: string): Promise<Deliveryman | null>

    findDeliverymanByUsername(username: string): Promise<Deliveryman | null>

    findAllAvailable(): Promise<Deliveries[]>

    findAllDeliveries(deliveryman_id: string): Promise<Deliveries[] | undefined>

    updateDeliveriesForDeliveryman(data: Prisma.DeliveriesUpdateInput, where: Prisma.DeliveriesWhereUniqueInput): Promise<Deliveries>
}   