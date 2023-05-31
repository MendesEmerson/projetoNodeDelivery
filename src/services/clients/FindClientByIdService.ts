import { ClientsRepository } from "../../repositories/clients/ClientsRepository";
import { ClientNotFoundException } from "../exceptionsHandler/clientsExceptions/ClientNotFoundException";

export class FindClientByIdService {
    constructor(private clientsRepository: ClientsRepository){}

    async execute(client_id: string) {
        const client = await this.clientsRepository.findClientById(client_id)

        if(!client) {
            throw new ClientNotFoundException();
        }

        return client
    }
    
}