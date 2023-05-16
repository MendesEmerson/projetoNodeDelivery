import e, { Request, Response } from "express";
import { ClientsService } from "../services/ClientsService";

const clientsService = new ClientsService();

export class ClientController {
  async createClient(request: Request, response: Response) {
    const { username, password } = request.body;
    try {
      if (!username || !password) {
        return response.status(400).json({
          message: "Username and password are required",
        });
      }
      const newClient = await clientsService.createClient({
        password,
        username,
      });
      return response.status(201).json(newClient);
    } catch (error: any) {
      console.log(error);
      if (error.message === "Invalid username or password") {
        return response
          .status(401)
          .json({ message: "Invalid username or password" });
      }
      return response.status(500).json({ message: "Internal server error" });
    }
  }

  async findClientById(request: Request, response: Response) {
    const { id_client } = request;
    try {
      const client = await clientsService.findClientById(id_client);
      return response.status(200).json(client);
    } catch (error) {
      console.log(error);
      return response.status(500).json({ message: "Internal server error" });
    }
  }

  async findAllDeliveries(request: Request, response: Response) {
    const { id_client } = request;
    try {
      const deliveries = await clientsService.findAllDeliveries(id_client);
      return response.status(200).json(deliveries);
    } catch (error) {
      console.log(error);
      return response.status(500).json({ message: "Internal server error" });
    }
  }
}
