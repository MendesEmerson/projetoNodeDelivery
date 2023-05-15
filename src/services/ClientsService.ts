import { hash } from "bcrypt";
import { prisma } from "../database/prismaClient";

interface ICreateClient {
  username: string;
  password: string;
}

export class ClientsService {
  async createClient({ password, username }: ICreateClient) {
    const clientExist = await prisma.clients.findFirst({
      where: {
        username: {
          equals: username,
          mode: "insensitive",
        },
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

  async findClientById(id_client: string) {
    const client = await prisma.clients.findFirst({
      where: {
        id: id_client,
      },
    });
    return client;
  }

  async findAllDeliveries(id_client: string) {
    const deliveries = await prisma.clients.findMany({
      where: {
        id: id_client,
      },
      select: {
        deliveries: true,
        id: true,
        username: true,
      },
    });
    return deliveries;
  }
}
