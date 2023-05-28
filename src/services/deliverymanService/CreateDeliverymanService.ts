import { hash } from "bcrypt";
import { DeliverymanRepository } from "../../repositories/deliveryman/DeliverymanRepository";
import { DeliverymanAlreadyExistException } from "../exceptionsHandler/deliverymanExceptions/DeliverymanAlreadyExistException";

interface ICreateDeliveryman {
    username: string
    password: string
}

export class CreateDeliverymanService {
    constructor(private deliverymanRepository: DeliverymanRepository) { }

    async execute({ password, username }: ICreateDeliveryman) {

        const verifyUsername = await this.deliverymanRepository.findDeliverymanByUsername(username)

        if(verifyUsername) {
            throw new DeliverymanAlreadyExistException()
        }

        const hashedPassword = await hash(password, 6);

        const createDeliveryman = await this.deliverymanRepository.createDeliveryman({
            password: hashedPassword,
            username
        })

        return createDeliveryman
    }
}