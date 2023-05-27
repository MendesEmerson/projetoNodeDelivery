import { Request, Response } from "express";
import { DeliveryService } from "../services/DeliveryService";

const deliveryService = new DeliveryService();

export class DeliveryController {

  async updateDeliveryman(request: Request, response: Response) {
    const { id_deliveryman } = request;
    const { id: id_delivery } = request.params;
    const delivery = await deliveryService.updateDeliveryman({
      id_deliveryman,
      id_delivery,
    });

    return response.json(delivery);
  }

  async updateEndDate(request: Request, response: Response) {
    const { id_deliveryman } = request;
    const { id: id_delivery } = request.params;
    const delivery = await deliveryService.updateEndDate({
      id_deliveryman,
      id_delivery
    })

    return response.json(delivery)
  }
}
