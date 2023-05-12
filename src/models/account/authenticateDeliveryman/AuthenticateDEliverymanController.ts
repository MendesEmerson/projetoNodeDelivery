import { Request, Response } from "express";
import { AuthenticateDeliverymanUserCase } from "./AuthenticateDeliverymanUseCase";

export class AuthenticateDeliverymanController {
  async handle(req: Request, res: Response) {
    const { username, password } = req.body;
    const authenticateDeliverymanUserCase = new AuthenticateDeliverymanUserCase();
    const result = await authenticateDeliverymanUserCase.execute({
      username,
      password,
    });
    return res.json(result)
  }
}
