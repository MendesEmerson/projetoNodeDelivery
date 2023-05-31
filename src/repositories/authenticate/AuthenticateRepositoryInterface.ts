import { Clients, Deliveryman, Restaurants } from "@prisma/client"

export interface IAuthenticateRepository {
    authenticateClient(username: string): Promise<Clients | null>
    authenticateDeliveryman(username: string): Promise<Deliveryman | null>
    authenticateRestaurant(username: string): Promise<Restaurants | null>
}