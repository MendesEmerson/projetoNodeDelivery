import { Router } from "express";
import { CreateClientController } from "./models/clients/useCases/createClient/createClientController";
import { AuthenticateClientController } from "./models/account/authenticateClient/AUthenticateClientController";
import { CreateDeliverymanController } from "./models/deliveryman/useCase/createDEliveryman/createDeliveryController";
import { AuthenticateDeliverymanController } from "./models/account/authenticateDeliveryman/AuthenticateDEliverymanController";

export const routes = Router();

const createClientController = new CreateClientController();
const authenticateClienteController = new AuthenticateClientController()
const createDeliverymanController = new CreateDeliverymanController()
const authenticateDeliverymanController = new AuthenticateDeliverymanController()


routes.post("/login/client", authenticateClienteController.handle)
routes.post("/login/deliveryman", authenticateDeliverymanController.handle)

routes.post("/clients", createClientController.handle);
routes.post("/deliveryman", createDeliverymanController.handle)
