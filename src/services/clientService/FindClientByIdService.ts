import { ClientsRepository } from "../../repositories/clients/ClientsRepository";

export class FindClientByIdService {
    constructor(private clientsRepository: ClientsRepository){}

    async execute(client_id: string) {
        const client = await this.clientsRepository.findClientById(client_id)

        if(!client) {
            throw new Error("Client not exist")
        }

        return client
    }
    
}