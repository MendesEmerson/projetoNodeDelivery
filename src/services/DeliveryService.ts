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
