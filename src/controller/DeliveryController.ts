import { Request, Response } from "express";
import { DeliveryService } from "../services/DeliveryService";

const deliveryService = new DeliveryService();

export class DeliveryController {
  async createDelivery(req: Request, res: Response) {
    const { item_name } = req.body;
    const { id_client } = req;
    const delivery = await deliveryService.createDelivery({
      id_client,
      item_name,
    });

    return res.json(delivery);
  }

  async findAllAvailable(req: Request, res: Response) {
    const deliveries = await deliveryService.findAllAvailable();

    return res.json(deliveries);
  }

  async updateDeliveryman(req: Request, res: Response) {
    const { id_deliveryman } = req;
    const { id: id_delivery } = req.params;
    const delivery = await deliveryService.updateDeliveryman({
      id_deliveryman,
      id_delivery,
    });

    return res.json(delivery);
  }

  async updateEndDate(req: Request, res: Response) {
    const { id_deliveryman } = req;
    const { id: id_delivery } = req.params;
    const delivery = await deliveryService.updateEndDate({
      id_deliveryman,
      id_delivery
    })

    return res.json(delivery)
  }
}
