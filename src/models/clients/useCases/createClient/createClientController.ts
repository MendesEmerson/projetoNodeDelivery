import { CreateClientUseCase } from "./createClientUseCase";
import { Request, Response } from "express";

export class CreateClientController {
  async handle(req: Request, res: Response) {
    const { username, password } = req.body;
    const createClienteUSerCase = new CreateClientUseCase();
    const result = await createClienteUSerCase.execute({
      username,
      password,
    });

    return res.json(result)
  }
}
