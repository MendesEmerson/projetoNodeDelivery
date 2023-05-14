import { Request, Response } from "express";
import { DeliverymanService } from "../services/DeliverymanService";

const deliverymanService = new DeliverymanService();

export class DeliverymanController {
  async createDeliveryman(request: Request, response: Response) {
    const { username, password } = request.body;
    const newDeliveryman = await deliverymanService.createDeliveryman({ password, username });
    return response.status(201).json(newDeliveryman);
  }

  async findDeliverymanById(request: Request, response: Response) {
    const { id_deliveryman } = request;
    const deliveryman = await deliverymanService.findDeliverymanById(id_deliveryman);
    return response.status(200).json(deliveryman);
  }

  async findAllDeliveries(request: Request, response: Response) {
    const { id_deliveryman } = request;
    const deliveries = await deliverymanService.findAllDeliveries(id_deliveryman);
    return response.status(200).json(deliveries);
  }
}
