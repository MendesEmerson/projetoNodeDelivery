import { DeliverymanRepository } from "../../repositories/deliveryman/DeliverymanRepository";

export class FindAllAvailableService {
    constructor(private deliverymanRepository: DeliverymanRepository){}

    async execute() {
        const deliveries = await this.deliverymanRepository.findAllAvailable()

        if(!deliveries) {
            throw new Error("Deliveries not found")
        }

        return deliveries
    }
}