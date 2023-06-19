import { CartRepository } from "../../repositories/cart/CartRepository";
import { ClientsRepository } from "../../repositories/clients/ClientsRepository";
import { RestaurantRepository } from "../../repositories/restaurant/RestaurantRepository";
import { ClientNotFoundException } from "../exceptionsHandler/clientsExceptions/ClientNotFoundException";
import { ItemNotFoundException } from "../exceptionsHandler/itemsExceptions/ItemNotFoundException";

interface IAddItemCart {
    client_id: string
    item_id: string
}

export class AddItemToCartService {
    constructor(
        private clientRepository: ClientsRepository,
        private restaurantRepository: RestaurantRepository,
        private cartRepository: CartRepository
    ) { }

    async execute({ client_id, item_id }: IAddItemCart) {
        const client = await this.clientRepository.findClientById(client_id)

        if (!client) {
            throw new ClientNotFoundException()
        }

        const item = await this.restaurantRepository.findItemById(item_id)

        if (!item) {
            throw new ItemNotFoundException()
        }

        const cart = await this.cartRepository.findCartOpen(client.id)

        if (cart) {
            const updateCart = await this.cartRepository.updateCart(
                cart.id,
                {
                    value: cart.value + item.price,
                    items: {
                        connect: [...cart.items.map((existingItem) => ({ id: existingItem.id })), { id: item.id }],
                    },
                }
            )
        } else {
            const newCart = this.cartRepository.createCart({
                client: { connect: { id: client.id } },
                value: item.price,
                items: { connect: { id: item.id } }
            })
        }
        return item
    }
}