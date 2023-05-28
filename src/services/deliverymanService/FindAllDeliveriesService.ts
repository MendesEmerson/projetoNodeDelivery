import { DeliverymanRepository } from "../../repositories/deliveryman/DeliverymanRepository";
import { DeliverymanNotFoundException } from "../exceptionsHandler/deliverymanExceptions/DeliverymanNotFoundException";

export class FindAllDeliveriesService {
    constructor(private deliverymanRepository: DeliverymanRepository) { }

    async execute(deliveryman_id: string) {
    
        if(!deliveryman_id) {
            throw new DeliverymanNotFoundException();
        }
            const deliveries = await this.deliverymanRepository.findAllDeliveries(deliveryman_id)

        return deliveries
    }
}