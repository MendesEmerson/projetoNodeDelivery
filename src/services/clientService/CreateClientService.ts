import { hash } from "bcrypt";
import { ClientsRepository } from "../../repositories/clients/ClientsRepository";
import { ClientAlreadyExistException } from "../exceptionsHandler/clientsExceptions/ClientAlreadyExistException";

interface ICreateClient {
    username: string
    password: string
    name: string
}

export class CreateClientService {
    constructor(private clientRepository: ClientsRepository) { }
    async execute({ password, username, name }: ICreateClient) {

        const verifyUsername = await this.clientRepository.findClientByUsername(username)

        if(verifyUsername) {
            throw new ClientAlreadyExistException()
        }

        const hashedPassword = await hash(password, 6);

        const newClient = await this.clientRepository.createClient({
            password: hashedPassword,
            username,
            name
        })

        return newClient
    }
}