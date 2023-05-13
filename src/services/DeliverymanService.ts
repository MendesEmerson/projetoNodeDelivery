import { hash } from "bcrypt";
import { prisma } from "../database/prismaClient";

interface ICreateDeliveryman {
  username: string;
  password: string;
}

export class DeliverymanService {
  async createDeliveryman({ password, username }: ICreateDeliveryman) {
    const deliverymanExist = await prisma.deliveryman.findFirst({
      where: {
        username: {
          equals: username,
          mode: "insensitive",
        },
      },
    });
    if (deliverymanExist) {
      throw new Error("Deliveryman already exist");
    }

    const hashedPassword = await hash(password, 10);

    const deliveryman = await prisma.deliveryman.create({
      data: {
        username,
        password: hashedPassword,
      },
    });
    return deliveryman;
  }

  async findDeliverymanById(id_deliveryman: string) {
    const deliveryman = await prisma.clients.findFirst({
      where: {
        id: id_deliveryman,
      },
    });
    return deliveryman;
  }

  async findAllDeliveries(id_deliveryman: string) {
    const deliveries = await prisma.deliveryman.findMany({
      where: {
        id: id_deliveryman,
      },
      select: {
        deliveries: true,
        id: true,
        username: true
      },
    });
    return deliveries;
  }
}
