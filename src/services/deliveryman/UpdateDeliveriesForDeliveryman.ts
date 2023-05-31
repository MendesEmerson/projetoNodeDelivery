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

        let deliveryFound = false;

        deliveriesExist.forEach((entregas) => {
            if (entregas.id === delivery_id) {
                deliveryFound = true;
                return; // Interrompe o loop forEach
            }
        })

        if (!deliveryman) {
            throw new DeliverymanNotFoundException()
        }

        if (!deliveryFound) {
            throw new DeliveryNotFoundException();
        }

        const delivery = await this.deliverymanRepository.updateDeliveriesForDeliveryman({
            delivery_id,
            deliveryman_id
        })

        return delivery
    }

}