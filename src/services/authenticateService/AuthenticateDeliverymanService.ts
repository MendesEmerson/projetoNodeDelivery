import { compare } from "bcrypt";
import { AuthenticateRepository } from "../../repositories/authenticate/AuthenticateRepository";
import { sign } from "jsonwebtoken";
import { InvalidClientLoginException } from "../exceptionsHandler/clientsExceptions/InvalidClientLoginException";

interface IAuthDeliveryman {
    username: string
    password: string
}

export class AuthenticateDeliverymanService {
    constructor(private authenticateRepository: AuthenticateRepository) { }

    async execute({ password, username }: IAuthDeliveryman) {
        const deliveryman = await this.authenticateRepository.authenticateDeliveryman(password, username)

        if (!deliveryman) {
            throw new InvalidClientLoginException()
        }

        const passwordMatch = await compare(password, deliveryman.password);

        if (!passwordMatch) {
            throw new InvalidClientLoginException()
        }

        const token = sign({ username }, "bbca61cf2f17de7dfbe347b803122fda", {
            subject: deliveryman.id,
            expiresIn: "1d",
        });

        return token;
    }
}