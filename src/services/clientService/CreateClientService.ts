import { hash } from "bcrypt";
import { ClientsRepository } from "../../repositories/clients/ClientsRepository";

interface ICreateClient {
    username: string
    password: string
}

export class CreateClientService {
    constructor(private clientRepository: ClientsRepository) { }
    async execute({ password, username }: ICreateClient) {

        const verifyUsername = await this.clientRepository.findClientByUsername(username)

        if(verifyUsername) {
            throw new Error("Username already exist")
        }

        const hashedPassword = await hash(password, 6);

        const newClient = await this.clientRepository.createClient({
            password: hashedPassword,
            username
        })

        return newClient
    }
}