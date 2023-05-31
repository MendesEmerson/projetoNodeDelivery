import { format } from "date-fns";
import { DeliverymanRepository } from "../../repositories/deliveryman/DeliverymanRepository";
import { DeliveryNotFoundException } from "../exceptionsHandler/deliverymanExceptions/DeliveryNotFoundException";
import { DeliverymanNotFoundException } from "../exceptionsHandler/deliverymanExceptions/DeliverymanNotFoundException";

interface IUpdateDeliveriesEnd {
    delivery_id: string
    deliveryman_id: string
}

export class UpdateDeliveriesEndDateService {
    constructor(private deliverymanRepository: DeliverymanRepository) { }

    async execute({ delivery_id, deliveryman_id }: IUpdateDeliveriesEnd) {

        const deliveryman = await this.deliverymanRepository.findDeliverymanById(deliveryman_id)
        const deliveries = await this.deliverymanRepository.findAllDeliveries(deliveryman_id)
        const currentDate = new Date();
        const formattedDate = format(currentDate, "dd/MM/yyyy HH:mm");

        console.log(delivery_id)

        if (!deliveryman) {
            throw new DeliverymanNotFoundException()
        }

        if (!deliveries) {
            throw new DeliveryNotFoundException()
        }

        const delivery = deliveries.find((entrega) => entrega.id === delivery_id)

        console.log(delivery)

        if (!delivery) {
            throw new DeliveryNotFoundException()
        }


        const updatedDeliveries = await this.deliverymanRepository.updateDeliveriesEndDate({
            date: formattedDate,
            delivery_id: delivery.id
        })

        return updatedDeliveries

    }
}