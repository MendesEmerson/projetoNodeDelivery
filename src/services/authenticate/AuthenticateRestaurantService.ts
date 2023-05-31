import { compare } from "bcrypt";
import { AuthenticateRepository } from "../../repositories/authenticate/AuthenticateRepository";
import { sign } from "jsonwebtoken";
import { InvalidDeliverymanLoginException } from "../exceptionsHandler/deliverymanExceptions/InvalidDeliverymanLoginException";

interface IAuthRestaurant{
    username: string
    password: string
}

export class AuthenticateRestaurantService {
    constructor(private authenticateRepository: AuthenticateRepository) { }

    async execute({ password, username }: IAuthRestaurant) {
        const restaurant = await this.authenticateRepository.authenticateRestaurant(username)

        if (!restaurant) {
            throw new InvalidDeliverymanLoginException()
        }

        const passwordMatch = await compare(password, restaurant.password);

        if (!passwordMatch) {
            throw new InvalidDeliverymanLoginException()
        }

        const token = sign({ username }, "bbca77cf2f17de7dfbe347b803122fda", {
            subject: restaurant.id,
            expiresIn: "1d",
        });

        return token;
    }
}