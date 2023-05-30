import { Clients, Deliveries, Prisma } from "@prisma/client";

export interface IClientsRepository {
    createClient({ password, username }: Prisma.ClientsCreateInput): Promise<Clients>

    createDelivery(data: Prisma.DeliveriesCreateInput): Promise<Deliveries>

    findClientById(client_id: string): Promise<Clients | null>

    findClientByUsername(username: string): Promise<Clients | null>

    findAllDeliveries(client_id: string): Promise<Deliveries[] | undefined>

    findAllAcceptedDeliveries(client_id: string): Promise<Deliveries[] | undefined>


}