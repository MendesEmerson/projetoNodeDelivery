import { Request, Response } from "express";
import { AuthenticateService } from "../services/AuthenticateService";

const authenticateService = new AuthenticateService();

export class AuthenticateController {

  async authenticateClient(req: Request, res: Response) {
    const { username, password } = req.body;
    const result = await authenticateService.authenticateClient({
      username,
      password,
    });
    return res.json(result)
  }

  async authenticateDeliveryman(req: Request, res: Response) {
    const { username, password } = req.body;
    const result = await authenticateService.authenticateDeliveryman({
      username,
      password,
    });
    return res.json(result)
  }
}