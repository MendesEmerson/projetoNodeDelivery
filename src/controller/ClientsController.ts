import { Request, Response } from "express";
import { ClientsService } from "../services/ClientsService";

const clientsService = new ClientsService();

export class ClientController {
  async createClient(request: Request, response: Response) {
    const { username, password } = request.body;
    const newClient = await clientsService.createClient({ password, username });
    return response.status(201).json(newClient);
  }

  async findClientById(request: Request, response: Response) {
    const { id_client } = request;
    const client = await clientsService.findClientById(id_client);
    return response.status(200).json(client);
  }

  async findAllDeliveries(request: Request, response: Response) {
    const { id_client } = request;
    const deliveries = await clientsService.findAllDeliveries(id_client);
    return response.status(200).json(deliveries);
  }
}
