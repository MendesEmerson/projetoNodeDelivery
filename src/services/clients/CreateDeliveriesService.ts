import { Deliveries } from '@prisma/client';
import { format } from "date-fns";
import { ClientsRepository } from "../../repositories/clients/ClientsRepository";
import { ClientNotFoundException } from "../exceptionsHandler/clientsExceptions/ClientNotFoundException";
import { CartRepository } from '../../repositories/cart/CartRepository';

interface ICreateDelivery {
    id_client: string;
}

export class CreateDeliveriesService {
    constructor(private clientsRepository: ClientsRepository, private cartRepository: CartRepository) { }

    async execute({ id_client }: ICreateDelivery) {
        const currentDate = new Date();
        const formattedDate = format(currentDate, "dd/MM/yyyy HH:mm");
        const client = await this.clientsRepository.findClientById(id_client)
        const cart = await this.cartRepository.findCartOpen(id_client)

        if (!client) {
            throw new ClientNotFoundException()
        }

        if (!cart) {
            throw new Error("Criar erro para carrinho inexistente")
        }

        const closeCart = await this.cartRepository.updateCart(
            cart.id,
            { finish: true }
        )

        const createDelivery = await this.clientsRepository.createDelivery({
            client: {
                connect: { id: client.id },
            },
            created_at: formattedDate,
            cart: {
                connect: { id: closeCart.id }
            }

        })



        return { delivery: createDelivery, client: client }

    }



}