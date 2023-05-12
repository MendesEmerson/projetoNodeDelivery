import { prisma } from "../../../../database/prismaClient";
import { hash } from "bcrypt";

interface ICreateClient {
  username: string;
  password: string;
}

export class CreateClientUseCase {
  async execute({ password, username }: ICreateClient) {
    const clientExist = await prisma.clients.findFirst({
      where: {
        username
      },
    });
    if (clientExist) {
      throw new Error("Client already exist");
    }

    const hashedPassword = await hash(password, 10);

    const client = await prisma.clients.create({
      data: {
        username,
        password: hashedPassword,
      },
    });
    return client;
  }
}
