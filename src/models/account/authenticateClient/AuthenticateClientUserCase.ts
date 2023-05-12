import { prisma } from "../../../database/prismaClient";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";

interface IAuthenticateClient {
  username: string;
  password: string;
}

export class AuthenticateClientUserCase {
  async execute({ password, username }: IAuthenticateClient) {
    const client = await prisma.clients.findFirst({
      where: {
        username: username,
      },
    });
    if (!client) {
      throw new Error("Invalid username or password");
    }

    const passwordMatch = await compare(password, client.password);

    if (!passwordMatch) {
      throw new Error("Invalid username or password");
    }

    const token = sign({ username }, "bbca61cf2f25de7dfbe347b803122fda", {
      subject: client.id,
      expiresIn: "1h",
    });

    return token;
  }
}
