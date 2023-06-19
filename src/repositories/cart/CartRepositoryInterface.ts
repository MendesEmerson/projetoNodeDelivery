import { Cart, Items, Prisma } from "@prisma/client"

export interface cartWithItems extends Cart {
    items: Items[]
}

export interface ICartRepository {
    createCart(data: Prisma.CartCreateInput): Promise<Cart>

    findCartOpen(client_id: string): Promise<cartWithItems | null>

    updateCart(cart_id: string, data: Prisma.CartUpdateInput): Promise<Cart>
}