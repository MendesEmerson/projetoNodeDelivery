import { Clients, Deliveryman } from "@prisma/client"

export interface IAuthenticateRepository {
    authenticateClient(password: string, username: string): Promise<Clients | null>
    authenticateDeliveryman(password: string, username: string): Promise<Deliveryman | null>
}