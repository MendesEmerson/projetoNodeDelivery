import { prisma } from "../database/prismaClient";
import { format } from "date-fns";

interface ICreateDelivery {
  item_name: string;
  id_client: string;
}

interface IUpdateDeliveryman {
  id_delivery: string;
  id_deliveryman: string;
}

export class DeliveryService {
  async createDelivery({ id_client, item_name }: ICreateDelivery) {
    const currentDate = new Date();
    const formattedDate = format(currentDate, "dd/MM/yyyy HH:mm");
    const delivery = await prisma.deliveries.create({
      data: {
        item_name,
        created_at: formattedDate,
        id_client,
      },
    });
    return delivery;
  }

  async findAllAvailable() {
    const deliveries = await prisma.deliveries.findMany({
      where: {
        end_at: null,
        id_deliveryman: null,
      },
    });
    return deliveries;
  }

  async updateDeliveryman({ id_delivery, id_deliveryman }: IUpdateDeliveryman) {
    const result = await prisma.deliveries.update({
      where: {
        id: id_delivery,
      },
      data: {
        id_deliveryman,
      },
    });
    return result;
  }

  async updateEndDate({ id_delivery, id_deliveryman }: IUpdateDeliveryman) {
    const currentDate = new Date();
    const formattedDate = format(currentDate, "dd/MM/yyyy HH:mm");
    await prisma.deliveries.updateMany({
      where: {
        id: id_delivery,
        deliveryman: {
          id: id_deliveryman,
        },
      },
      data: {
        end_at: formattedDate,
      },
    });

    const updatedDeliveries = await prisma.deliveries.findMany({
      where: {
        id: id_delivery,
        deliveryman: {
          id: id_deliveryman,
        },
      },
    });

    return updatedDeliveries;
  }
}
