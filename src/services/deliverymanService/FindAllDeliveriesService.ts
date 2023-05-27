import { DeliverymanRepository } from "../../repositories/deliveryman/DeliverymanRepository";

export class FindAllDeliveriesService {
    constructor(private deliverymanRepository: DeliverymanRepository) { }

    async execute(deliveryman_id: string) {
        const deliveries = await this.deliverymanRepository.findAllDeliveries(deliveryman_id)

        return deliveries
    }
}