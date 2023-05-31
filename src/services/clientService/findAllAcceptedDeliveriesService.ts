import { ClientsRepository } from "../../repositories/clients/ClientsRepository";

export class FindAllAcceptedDeliveriesClientService {
    constructor(private clientsRepository: ClientsRepository) {}

    async execute(client_id: string) {
        const clientDeliveries = await this.clientsRepository.findAllAcceptedDeliveries(client_id)
        
        return clientDeliveries
    }
}