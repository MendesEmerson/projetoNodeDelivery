import { Request, Response } from "express";
import { ClientsRepository } from "../../repositories/clients/ClientsRepository";
import { FindAllDeliveriesClientService } from "../../services/clientService/FindAllDeliveriesService";

export class FindAllDeliveriesCliientController {
    async handle(request: Request, response: Response) {
        const clientsRepository = new ClientsRepository()
        const findAllDeliveries = new FindAllDeliveriesClientService(clientsRepository)

        const {id_client} = request

        try {
            if(!id_client) {
                return response.status(404).json({message: "Invalid Client id"})
            }
            const clientDeliveries = await findAllDeliveries.execute(id_client)

            console.log(clientDeliveries)

            return response.status(200).json(clientDeliveries)

        } catch (error) {
            return response.status(500).json({message: "Internal Server Error"})
        }
    }
}