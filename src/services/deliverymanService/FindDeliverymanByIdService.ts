import { DeliverymanRepository } from "../../repositories/deliveryman/DeliverymanRepository";
import { DeliverymanNotFoundException } from "../exceptionsHandler/deliverymanExceptions/DeliverymanNotFoundException";

export class FindDeliverymanByIdService {
    constructor(private deliverymanRepository: DeliverymanRepository) { }

    async execute(deliveryman_id: string) {
        const deliveryman = await this.deliverymanRepository.findDeliverymanById(deliveryman_id)

        if (!deliveryman) {
            throw new DeliverymanNotFoundException();
        }

        return deliveryman
    }
}