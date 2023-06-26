import { CartRepository } from "../../repositories/cart/CartRepository";
import { CartNotFoundException } from "../exceptionsHandler/cartExceptions/CartNotFoundException";

export class FindOpenCartService {
    constructor(private cartRepository: CartRepository){}

    async execute(client_id: string){

        const openCart = await this.cartRepository.findCartOpen(client_id)

        if(!openCart){
            throw new CartNotFoundException()
        }

        return openCart
    }
}