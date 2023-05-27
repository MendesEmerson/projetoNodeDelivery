import { DeliverymanRepository } from "../../repositories/deliveryman/DeliverymanRepository";

interface ICreateDeliveryman {
    username: string
    password: string
}

export class CreateDeliverymanService {
    constructor(private deliverymanRepository: DeliverymanRepository) { }

    async execute({ password, username }: ICreateDeliveryman) {
        const createDeliveryman = await this.deliverymanRepository.createDeliveryman({
            password,
            username
        })

        return createDeliveryman
    }
}