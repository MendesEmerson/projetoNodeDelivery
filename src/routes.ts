import { Router } from "express";
import { ClientController } from "./controller/ClientsController";
import { ensureAuthenticateClient } from "./middlewares/ensureAuthenticateClient";
import { AuthenticateController } from "./controller/AuthenticateController";
import { ensureAuthenticateDeliveryman } from "./middlewares/ensureAuthenticateDeliveryman";
import { DeliverymanController } from "./controller/DeliverymanController";
import { DeliveryController } from "./controller/DeliveryController";

export const routes = Router();

const clientController = new ClientController();
const deliverymanController = new DeliverymanController();
const authenticateController = new AuthenticateController();
const deliveryController = new DeliveryController();

routes.post(
  "/login/client", 
  authenticateController.authenticateClient
);

routes.post(
  "/login/deliveryman",
  authenticateController.authenticateDeliveryman
);

routes.get(
  "/client/",
  ensureAuthenticateClient,
  clientController.findClientById
);

routes.get(
  "/client/deliveries",
  ensureAuthenticateClient,
  clientController.findAllDeliveries
);

routes.post(
  "/client", 
  clientController.createClient
);

routes.get(
  "/deliveryman",
  ensureAuthenticateDeliveryman,
  deliverymanController.findDeliverymanById
);

routes.get(
  "/deliveryman/deliveries",
  ensureAuthenticateDeliveryman,
  deliverymanController.findAllDeliveries
);

routes.post(
  "/deliveryman", 
  deliverymanController.createDeliveryman
);

routes.get(
  "/delivery/available",
  ensureAuthenticateDeliveryman,
  deliveryController.findAllAvailable
);

routes.post(
  "/delivery",
  ensureAuthenticateClient,
  deliveryController.createDelivery
);

routes.put(
  "/delivery/updateDeliveryman/:id",
  ensureAuthenticateDeliveryman,
  deliveryController.updateDeliveryman
);

routes.put(
  "/delivery/updateEndDate/:id",
  ensureAuthenticateDeliveryman,
  deliveryController.updateEndDate
);
