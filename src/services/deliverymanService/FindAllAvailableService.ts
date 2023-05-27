import { DeliverymanRepository } from "../../repositories/deliveryman/DeliverymanRepository";
import { DeliverymanNotFoundException } from "../exceptionsHandler/deliverymanExceptions/DeliverymanNotFoundException";

export class FindAllAvailableService {
    constructor(private deliverymanRepository: DeliverymanRepository){}

    async execute() {
        const deliveries = await this.deliverymanRepository.findAllAvailable()

        if(!deliveries) {
            throw new DeliverymanNotFoundException()
        }

        return deliveries
    }
}