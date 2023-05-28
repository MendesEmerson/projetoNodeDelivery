import { Request, Response } from "express";
import { DeliverymanRepository } from "../../repositories/deliveryman/DeliverymanRepository";
import { UpdateDeliveriesEndDateService } from "../../services/deliverymanService/UpdateDeliveriesEndDateService";
import { DeliverymanNotFoundException } from "../../services/exceptionsHandler/deliverymanExceptions/DeliverymanNotFoundException";
import { DeliveryNotFoundException } from "../../services/exceptionsHandler/deliverymanExceptions/DeliveryNotFoundException";
import { UncaughtHandlerException } from "../../services/exceptionsHandler/UncaughtHandlerException";

export class UpdateDeliveriesEndDateController {
    async handle(request: Request, response: Response) {
        const deliverymanRepository = new DeliverymanRepository()
        const updateDeliveriesEndDate = new UpdateDeliveriesEndDateService(deliverymanRepository)

        const { id_deliveryman } = request
        const { id_delivery } = request.params

        try {
            const updatedDeliveries = await updateDeliveriesEndDate.execute({
                delivery_id: id_delivery,
                deliveryman_id: id_deliveryman
            })

            return response.status(200).json(updatedDeliveries)
        } catch (error) {
            if (error instanceof DeliverymanNotFoundException) {
                response.status(error.status).json(error)
            }
            else if (error instanceof DeliveryNotFoundException) {
                response.status(error.status).json(error)
                const uncaughtHandlerException = new UncaughtHandlerException()
                return response.status(uncaughtHandlerException.status).json(uncaughtHandlerException)
            }

        }
    }
}