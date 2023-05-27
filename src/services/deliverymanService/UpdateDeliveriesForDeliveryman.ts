import { DeliverymanRepository } from "../../repositories/deliveryman/DeliverymanRepository";
import { DeliverymanNotFoundException } from "../exceptionsHandler/deliverymanExceptions/DeliverymanNotFoundException";

interface IUpdateDeliveries {
    delivery_id: string
    deliveryman_id: string
}

export class UpdateDeliveriesForDeliverymanService {
    constructor(private deliverymanRepository: DeliverymanRepository){}

    async execute({delivery_id, deliveryman_id}:IUpdateDeliveries) {

        const deliveryman = await this.deliverymanRepository.findDeliverymanById(deliveryman_id)

        if(!deliveryman) {
            throw new DeliverymanNotFoundException()
        }

        if(!delivery_id) {
            throw new Error("Delivery not found")
        }

        const delivery = await this.deliverymanRepository.updateDeliveriesForDeliveryman({
            delivery_id,
            deliveryman_id
        })

        return delivery
    }

}