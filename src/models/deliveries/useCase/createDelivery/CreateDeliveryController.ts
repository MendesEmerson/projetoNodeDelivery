import { Request, Response } from "express";
import { CreateDeliveryUseCase } from "./CreateDeliveryUseCase";

export class CreateDeliveryController {
  async handle(req: Request, res: Response) {
    const { item_name } = req.body;
    const { id_client } = req;
    const createDeliveryUserCase = new CreateDeliveryUseCase();
    const delivery = await createDeliveryUserCase.execute({
      id_client,
      item_name,
    });

    return res.json(delivery);
  }
}
