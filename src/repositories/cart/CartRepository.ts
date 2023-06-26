import { Prisma, Cart } from "@prisma/client";
import { ICartRepository, cartWithItems } from "./CartRepositoryInterface";
import { prisma } from "../../database/prismaClient";

export class CartRepository implements ICartRepository {
    async createCart(data: Prisma.CartCreateInput): Promise<Cart> {
        const newCart = await prisma.cart.create({
            data
        })
        return newCart
    }

    async findCartOpen(client_id: string): Promise<cartWithItems | null> {
        const cart = await prisma.cart.findFirst({
            where: {
                clientsId: client_id,
                finish: false
            },
            include: {
                items: true
            }
        })
        return cart
    }

    async updateCart(cart_id: string, data: Prisma.CartUpdateInput): Promise<Cart> {

        const updateCart = await prisma.cart.update({
            where: {
                id: cart_id
            },
            data: {
                value: data.value,
                items: data.items,
                finish: data.finish
            },
            include: {
                items: true
            }
        })
        return updateCart
    }

}