import { DeliverymanRepository } from "../../repositories/deliveryman/DeliverymanRepository";
import { DeliveryNotFoundException } from "../exceptionsHandler/deliverymanExceptions/DeliveryNotFoundException";
import { DeliverymanNotFoundException } from "../exceptionsHandler/deliverymanExceptions/DeliverymanNotFoundException";

interface IUpdateDeliveries {
    delivery_id: string
    deliveryman_id: string
}

export class UpdateDeliveriesForDeliverymanService {
    constructor(private deliverymanRepository: DeliverymanRepository) { }

    async execute({ delivery_id, deliveryman_id }: IUpdateDeliveries) {

        const deliveryman = await this.deliverymanRepository.findDeliverymanById(deliveryman_id)

        const deliveriesExist = await this.deliverymanRepository.findAllAvailable()

        deliveriesExist.forEach((delivery) => {
            if (delivery.id !== delivery_id) {
                throw new DeliveryNotFoundException()
            }
        })

        if (!deliveryman) {
            throw new DeliverymanNotFoundException()
        }


        const delivery = await this.deliverymanRepository.updateDeliveriesForDeliveryman({
            delivery_id,
            deliveryman_id
        })

        return delivery
    }

}