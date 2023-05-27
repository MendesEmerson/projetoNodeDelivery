import { Request, Response } from "express";
import { ClientsRepository } from "../../repositories/clients/ClientsRepository";
import { FindAllDeliveriesClientService } from "../../services/clientService/FindAllDeliveriesService";
import { ClientNotFoundException } from "../../services/exceptionsHandler/clientsExceptions/ClientNotFoundException";

export class FindAllDeliveriesCliientController {
    async handle(request: Request, response: Response) {
        const clientsRepository = new ClientsRepository()
        const findAllDeliveries = new FindAllDeliveriesClientService(clientsRepository)

        const {id_client} = request

        try {
            if(!id_client) {
                throw new ClientNotFoundException();
            }
            const clientDeliveries = await findAllDeliveries.execute(id_client)

            console.log(clientDeliveries)

            return response.status(200).json(clientDeliveries)

        } catch (error) {
            if(error instanceof ClientNotFoundException) {
                return response.status(error.status).json(error)
            }
            return response.status(500).json({message: "Internal Server Error"})
        }
    }
}