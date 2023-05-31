import { Deliveries, Deliveryman, Prisma } from "@prisma/client";

interface IUpdateDeliveries {
    delivery_id: string
    deliveryman_id: string
}

interface IUpdateDeliveriesEnd {
    delivery_id: string
    deliveryman_id: string
    date: string
}

export interface IDeliverymanRepository {

    createDeliveryman({ password, username }: Prisma.DeliverymanCreateInput): Promise<Deliveryman | null>

    findDeliverymanById(deliveryman_id: string): Promise<Deliveryman | null>

    findDeliverymanByUsername(username: string): Promise<Deliveryman | null>

    findAllAvailable(): Promise<Deliveries[]>

    findAllDeliveries(deliveryman_id: string): Promise<Deliveries[] | undefined>

    findAllFinishDeliveries(deliveryman_id: string): Promise<Deliveries[] | undefined>

    updateDeliveriesForDeliveryman({ delivery_id, deliveryman_id }: IUpdateDeliveries): Promise<Deliveries>

    updateDeliveriesEndDate({ delivery_id, deliveryman_id }: IUpdateDeliveriesEnd): Promise<Deliveries>
}   