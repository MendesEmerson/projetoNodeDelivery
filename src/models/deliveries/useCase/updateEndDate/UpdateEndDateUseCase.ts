import { prisma } from '../../../../database/prismaClient';

interface IUpdateDeliveryman {
  id_delivery: string;
  id_deliveryman: string;
}

export class UpdateEndDateUseCase {
  async execute({ id_delivery, id_deliveryman }: IUpdateDeliveryman) {
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
