import { prisma } from "../../../database/prismaClient";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";

interface IAuthenticateDeliveryman {
  username: string;
  password: string;
}

export class AuthenticateDeliverymanUserCase {
  async execute({ password, username }: IAuthenticateDeliveryman) {
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
