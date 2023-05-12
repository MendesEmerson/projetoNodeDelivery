import { CreateDeliverymanUserCase } from "./CreateDeliverymanUSeCase";
import { Request, Response } from "express";

export class CreateDeliverymanController {
  async handle(req: Request, res: Response) {
    const { username, password } = req.body;
    const createDeliveryUseCase = new CreateDeliverymanUserCase();
    const result = await createDeliveryUseCase.execute({
      username,
      password,
    });

    return res.json(result);
  }
}
