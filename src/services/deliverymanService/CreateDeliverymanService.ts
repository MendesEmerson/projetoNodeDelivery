import { hash } from "bcrypt";
import { DeliverymanRepository } from "../../repositories/deliveryman/DeliverymanRepository";

interface ICreateDeliveryman {
    username: string
    password: string
}

export class CreateDeliverymanService {
    constructor(private deliverymanRepository: DeliverymanRepository) { }

    async execute({ password, username }: ICreateDeliveryman) {

        const verifyUsername = await this.deliverymanRepository.findDeliverymanByUsername(username)

        if(verifyUsername) {
            throw new Error("Username already exist")
        }

        const hashedPassword = await hash(password, 6);

        const createDeliveryman = await this.deliverymanRepository.createDeliveryman({
            password: hashedPassword,
            username
        })

        return createDeliveryman
    }
}