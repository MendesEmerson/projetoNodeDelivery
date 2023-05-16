import { Request, Response } from "express";
import { AuthenticateService } from "../services/AuthenticateService";

const authenticateService = new AuthenticateService();

export class AuthenticateController {
  async authenticateClient(req: Request, res: Response) {
    const { username, password } = req.body;
    try {
      if (!username || !password) {
        return res
          .status(400)
          .json({ message: "Username and password are required" });
      }
      const result = await authenticateService.authenticateClient({
        username,
        password,
      });

      return res.json(result);
    } catch (error: any) {
      console.log(error);
      if (error.message === "Invalid username or password") {
        return res
          .status(401)
          .json({ message: "Invalid username or password" });
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async authenticateDeliveryman(req: Request, res: Response) {
    const { username, password } = req.body;

    try {
      if (!username || !password) {
        return res
          .status(400)
          .json({ message: "Username and password are required" });
      }

      const result = await authenticateService.authenticateDeliveryman({
        username,
        password,
      });

      return res.json(result);
    } catch (error: any) {
      console.log(error);
      if (error.message === "Invalid username or password") {
        return res
          .status(401)
          .json({ message: "Invalid username or password" });
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}
