import { Router } from "express";
import { CreateClientController } from "./models/clients/useCases/createClient/createClientController";
import { AuthenticateClientController } from "./models/account/authenticateClient/AUthenticateClientController";
import { CreateDeliverymanController } from "./models/deliveryman/useCase/createDEliveryman/createDeliveryController";
import { AuthenticateDeliverymanController } from "./models/account/authenticateDeliveryman/AuthenticateDEliverymanController";
import { CreateDeliveryController } from "./models/deliveries/useCase/createDelivery/CreateDeliveryController";
import { ensureAuthenticateClient } from "./middlewares/ensureAuthenticateClient";
import { FindAllAvailableController } from "./models/deliveries/useCase/findAllAvailable/FindAllAvailableController";

export const routes = Router();

const createClientController = new CreateClientController();
const authenticateClienteController = new AuthenticateClientController()
const createDeliverymanController = new CreateDeliverymanController()
const authenticateDeliverymanController = new AuthenticateDeliverymanController()
const createDeliveryController = new CreateDeliveryController()
const findAllAvailableController = new FindAllAvailableController()

//Login 
routes.post("/login/client", authenticateClienteController.handle)
routes.post("/login/deliveryman", authenticateDeliverymanController.handle)

//Criar
routes.post("/clients", createClientController.handle);
routes.post("/deliveryman", createDeliverymanController.handle)
routes.post("/delivery", ensureAuthenticateClient, createDeliveryController.handle)

//buscar
routes.get("/delivery/available", findAllAvailableController.handle)
