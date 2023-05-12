import { UpdateEndDateUseCase } from './UpdateEndDateUseCase';
import { Request, Response } from "express";

export class UpdateEndDateController {
  async handle(req: Request, res: Response) {
    const { id_deliveryman } = req;
    const { id: id_delivery } = req.params;

    const updateEndDateUseCase = new UpdateEndDateUseCase()
    const delivery = await updateEndDateUseCase.execute({
      id_deliveryman,
      id_delivery
    })

    return res.json(delivery)
  }
}
