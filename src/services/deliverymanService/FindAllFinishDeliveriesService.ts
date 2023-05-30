import { DeliverymanRepository } from "../../repositories/deliveryman/DeliverymanRepository";
import { DeliverymanNotFoundException } from "../exceptionsHandler/deliverymanExceptions/DeliverymanNotFoundException";

export class FindAllFinishDeliveriesService {
    constructor(private deliverymanRepository: DeliverymanRepository) { }

    async execute(deliveryman_id: string) {
    
        if(!deliveryman_id) {
            throw new DeliverymanNotFoundException();
        }
            const deliveries = await this.deliverymanRepository.findAllFinishDeliveries(deliveryman_id)

        return deliveries
    }
}