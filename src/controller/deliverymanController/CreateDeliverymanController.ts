import { Request, Response } from "express";
import { DeliverymanRepository } from "../../repositories/deliveryman/DeliverymanRepository";
import { CreateDeliverymanService } from "../../services/deliverymanService/CreateDeliverymanService";
import { InvalidDeliverymanLoginException } from "../../services/exceptionsHandler/deliverymanExceptions/InvalidDeliverymanLoginException";
import { DeliverymanAlreadyExistException } from "../../services/exceptionsHandler/deliverymanExceptions/DeliverymanAlreadyExistException";

export class CreateDeliverymanController {
    async handle(request: Request, response: Response) {
        const deliverymanRepository = new DeliverymanRepository()
        const createDeliverymanService = new CreateDeliverymanService(deliverymanRepository)

        const { username, password } = request.body

        try {
            if (!username || !password) {
                throw new InvalidDeliverymanLoginException()
            }

            const newDeliveryman = await createDeliverymanService.execute({
                password,
                username
            })

            return response.status(201).json(newDeliveryman)
        } catch (error) {
            if(error instanceof InvalidDeliverymanLoginException) {
                return response.status(error.status).json(error)
            } 
            else if(error instanceof DeliverymanAlreadyExistException){
                return response.status(error.status).json(error)
            }
            return response.status(500).json({message: "Internal server error"})
        }
    }
}