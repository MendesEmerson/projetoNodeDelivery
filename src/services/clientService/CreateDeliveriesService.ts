import { format } from "date-fns";
import { ClientsRepository } from "../../repositories/clients/ClientsRepository";

interface ICreateDelivery {
    item_name: string;
    id_client: string;
  }

export class CreateDeliveriesService {
    constructor(private clientsRepository: ClientsRepository) { }

    async execute({id_client, item_name}: ICreateDelivery) {
        const currentDate = new Date();
        const formattedDate = format(currentDate, "dd/MM/yyyy HH:mm");
        const client = await this.clientsRepository.findClientById(id_client)

        if(!client) {
            throw new Error("Client not found")
        }

        const createDelivery = await this.clientsRepository.createDelivery({
            client: {
                connect: {id: client.id}
            },
            created_at: formattedDate,
            item_name
        })

        return createDelivery

    }



}