import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { prisma } from "../database/prismaClient";

interface IAuthenticate {
  username: string;
  password: string;
}

export class AuthenticateService {


  async authenticateClient({ password, username }: IAuthenticate) {
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

  async authenticateDeliveryman({ password, username }: IAuthenticate) {
    const deliveryman = await prisma.deliveryman.findFirst({
      where: {
        username: username,
      },
    });
    if (!deliveryman) {
      throw new Error("Invalid username or password");
    }

    const passwordMatch = await compare(password, deliveryman.password);

    if (!passwordMatch) {
      throw new Error("Invalid username or password");
    }

    const token = sign({ username }, "bbca61cf2f17de7dfbe347b803122fda", {
      subject: deliveryman.id,
      expiresIn: "1h",
    });

    return token;
  }


}
