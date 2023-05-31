import { ClientsRepository } from "../../repositories/clients/ClientsRepository";

export class FindAllDeliveriesClientService {
    constructor(private clientsRepository: ClientsRepository) {}

    async execute(client_id: string) {
        const clientDeliveries = await this.clientsRepository.findAllDeliveries(client_id)
        
        return clientDeliveries
    }
}