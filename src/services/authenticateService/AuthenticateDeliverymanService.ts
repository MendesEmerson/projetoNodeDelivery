import { compare } from "bcrypt";
import { AuthenticateRepository } from "../../repositories/authenticate/AuthenticateRepository";
import { sign } from "jsonwebtoken";

interface IAuthDeliveryman {
    username: string
    password: string
}

export class AuthenticateDeliverymanService {
    constructor(private authenticateRepository: AuthenticateRepository) { }

    async execute({ password, username }: IAuthDeliveryman) {
        const deliveryman = await this.authenticateRepository.authenticateDeliveryman(password, username)

        if (!deliveryman) {
            throw new Error("Invalid username or password");
        }

        const passwordMatch = await compare(password, deliveryman.password);

        if (!passwordMatch) {
            throw new Error("Invalid username or password");
        }

        const token = sign({ username }, "bbca61cf2f17de7dfbe347b803122fda", {
            subject: deliveryman.id,
            expiresIn: "1d",
        });

        return token;
    }
}