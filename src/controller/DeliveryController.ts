import { Request, Response } from "express";
import { DeliveryService } from "../services/DeliveryService";

const deliveryService = new DeliveryService();

export class DeliveryController {
  async createDelivery(request: Request, response: Response) {
    const { item_name } = request.body;
    const { id_client } = request;
    const delivery = await deliveryService.createDelivery({
      id_client,
      item_name,
    });

    return response.json(delivery);
  }

  async findAllAvailable(request: Request, response: Response) {
    const deliveries = await deliveryService.findAllAvailable();

    return response.json(deliveries);
  }

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
