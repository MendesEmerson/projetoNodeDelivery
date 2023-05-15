import { prisma } from "../database/prismaClient";

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
    const delivery = await prisma.deliveries.create({
      data: {
        item_name,
        id_client,
      },
    });
    return delivery;
  }

  async findAllAvailable() {
    const deliveries = await prisma.deliveries.findMany({
      where: {
        end_at: null,
        id_deliveryman: null
      }
    })
  return deliveries
  }

  async updateDeliveryman({id_delivery, id_deliveryman}:IUpdateDeliveryman) {
    const result = await prisma.deliveries.update({
      where: {
        id: id_delivery
      },
      data: {
        id_deliveryman
      }
    })
    return result
  }

  async updateEndDate({ id_delivery, id_deliveryman }: IUpdateDeliveryman) {
    await prisma.deliveries.updateMany({
      where: {
        id: id_delivery,
        deliveryman: {
          id: id_deliveryman,
        },
      },
      data: {
        end_at: new Date(),
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