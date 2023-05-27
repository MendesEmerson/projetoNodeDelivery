import { DeliverymanRepository } from "../../repositories/deliveryman/DeliverymanRepository";

export class FindDeliverymanByIdService {
    constructor(private deliverymanRepository: DeliverymanRepository) { }

    async execute(deliveryman_id: string) {
        const deliveryman = await this.deliverymanRepository.findDeliverymanById(deliveryman_id)

        if (!deliveryman) {
            throw new Error("Deliveryman not found")
        }

        return deliveryman
    }
}