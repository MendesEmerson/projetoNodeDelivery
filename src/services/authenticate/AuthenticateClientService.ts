import { compare } from "bcrypt";
import { AuthenticateRepository } from "../../repositories/authenticate/AuthenticateRepository";
import { sign } from "jsonwebtoken";
import { InvalidClientLoginException } from "../exceptionsHandler/clientsExceptions/InvalidClientLoginException";

interface IAuthClient {
    username: string
    password:string
}

export class AuthenticateClientService {
    constructor(private authenticateRepository: AuthenticateRepository) {}

    async execute ({password, username}: IAuthClient) {
        const client = await this.authenticateRepository.authenticateClient(username)

        if (!client) {
            throw new InvalidClientLoginException()
          }
      
          const passwordMatch = await compare(password, client.password);
      
          if (!passwordMatch) {
            throw new InvalidClientLoginException()
          }
      
          const token = sign({ username }, "bbca61cf2f25de7dfbe347b803122fda", {
            subject: client.id,
            expiresIn: "1d",
          });
      
          return token;
    }
}