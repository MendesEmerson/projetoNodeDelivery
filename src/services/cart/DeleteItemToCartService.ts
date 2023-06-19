import { CartRepository } from "../../repositories/cart/CartRepository";
import { ClientsRepository } from "../../repositories/clients/ClientsRepository";
import { ClientNotFoundException } from "../exceptionsHandler/clientsExceptions/ClientNotFoundException";
import { ItemNotFoundException } from "../exceptionsHandler/itemsExceptions/ItemNotFoundException";

interface IDeleteItemCart {
    client_id: string;
    item_id: string;
}

export class DeleteItemToCartService {
    constructor(
        private clientRepository: ClientsRepository,
        private cartRepository: CartRepository
    ) {}

    async execute({ client_id, item_id }: IDeleteItemCart) {
        const client = await this.clientRepository.findClientById(client_id);

        if (!client) {
            throw new ClientNotFoundException();
        }

        const cart = await this.cartRepository.findCartOpen(client.id);

        if (!cart) {
            throw new Error("Cart not found");
        }

        const itemToRemove = cart.items.find((item) => item.id === item_id);

        if (!itemToRemove) {
            throw new ItemNotFoundException();
        }

        const updatedCart = await this.cartRepository.updateCart(cart.id, {
            value: cart.value - itemToRemove.price,
            items: { disconnect: [{ id: itemToRemove.id }] },
        });

        return updatedCart;
    }
}
