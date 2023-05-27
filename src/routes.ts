import { Router } from "express";
import { ensureAuthenticateClient } from "./middlewares/ensureAuthenticateClient";
import { ensureAuthenticateDeliveryman } from "./middlewares/ensureAuthenticateDeliveryman";
import { DeliverymanController } from "./controller/DeliverymanController";
import { DeliveryController } from "./controller/DeliveryController";
import { AuthenticateClientController } from "./controller/authenticateController/AuthenticateClientController";
import { AuthenticateDeliverymanController } from "./controller/authenticateController/AuthenticateDeliverymanController";
import { FindAllDeliveriesCliientController } from "./controller/clientsController/FindAllDeliveriesController";
import { CreateClientController } from "./controller/clientsController/CreateClientController";
import { FindClientByIdController } from "./controller/clientsController/FindClientByIdController";
import { createDeliverymanController } from "./controller/deliverymanController/CreateDeliverymanController";

export const routes = Router();

const deliverymanController = new DeliverymanController();
const deliveryController = new DeliveryController();


const authClientController = new AuthenticateClientController()
const authDeliverymanController = new AuthenticateDeliverymanController()

const createClient = new CreateClientController()
const findClientById = new FindClientByIdController()
const findAllDeliveriesClient = new FindAllDeliveriesCliientController()

const createDeliveryman = new createDeliverymanController()


// ========================== Login ========================
routes.post(
  "/login/client",
  authClientController.handle
);

routes.post(
  "/login/deliveryman",
  authDeliverymanController.handle
);


// ========================== Client ========================
routes.get(
  "/client/",
  ensureAuthenticateClient,
  findClientById.handle
);

routes.get(
  "/client/deliveries",
  ensureAuthenticateClient,
  findAllDeliveriesClient.handle
);

routes.post(
  "/client",
  createClient.handle
);


// ========================== Deliveryman ========================
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
  createDeliveryman.handle
);


// ========================== Deliveries ========================
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
