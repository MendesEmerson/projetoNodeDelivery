import { Router } from "express";
import { ensureAuthenticateClient } from "./middlewares/ensureAuthenticateClient";
import { ensureAuthenticateDeliveryman } from "./middlewares/ensureAuthenticateDeliveryman";
import { DeliveryController } from "./controller/DeliveryController";
import { AuthenticateClientController } from "./controller/authenticateController/AuthenticateClientController";
import { AuthenticateDeliverymanController } from "./controller/authenticateController/AuthenticateDeliverymanController";
import { FindAllDeliveriesCliientController } from "./controller/clientsController/FindAllDeliveriesController";
import { CreateClientController } from "./controller/clientsController/CreateClientController";
import { FindClientByIdController } from "./controller/clientsController/FindClientByIdController";
import { CreateDeliverymanController } from "./controller/deliverymanController/CreateDeliverymanController";
import { FindAllDeliveriesDeliverymanController } from "./controller/deliverymanController/FindAllDeliveriesController";
import { FindDeliverymanByIdController } from "./controller/deliverymanController/FindDeliverymanByIdController";
import { CreateDeliveryController } from "./controller/clientsController/CreateDeliveryController";
import { FindAllAvailableController } from "./controller/deliverymanController/FindAllAvailableController";
import { UpdateDeliveriesForDeliverymanController } from "./controller/deliverymanController/UpdateDeliveriesForDeliverymanController";

export const routes = Router();

const deliveryController = new DeliveryController();


const authClientController = new AuthenticateClientController()
const authDeliverymanController = new AuthenticateDeliverymanController()

const createClient = new CreateClientController()
const createDelivery = new CreateDeliveryController()
const findClientById = new FindClientByIdController()
const findAllDeliveriesClient = new FindAllDeliveriesCliientController()

const createDeliveryman = new CreateDeliverymanController()
const findAllAvailable = new FindAllAvailableController()
const findDeliverymanById = new FindDeliverymanByIdController()
const findAllDeliveriesDeliveryman = new FindAllDeliveriesDeliverymanController()
const updatdeDeliveriesForDeliveryman = new UpdateDeliveriesForDeliverymanController()


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

//BUscar usuario por ID
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


routes.post(
  "/client/delivery",
  ensureAuthenticateClient,
  createDelivery.handle
);

// ========================== Deliveryman ========================
routes.get(
  "/deliveryman",
  ensureAuthenticateDeliveryman,
  findDeliverymanById.handle
);

routes.get(
  "/deliveryman/deliveries",
  ensureAuthenticateDeliveryman,
  findAllDeliveriesDeliveryman.handle
);

routes.get(
  "/delivery/available",
  ensureAuthenticateDeliveryman,
  findAllAvailable.handle
);

routes.post(
  "/deliveryman",
  createDeliveryman.handle
);

routes.put(
  "/delivery/updateDeliveryman/:id_deliveries",
  ensureAuthenticateDeliveryman,
  updatdeDeliveriesForDeliveryman.handle
);


// ========================== Deliveries ========================


routes.put(
  "/delivery/updateEndDate/:id",
  ensureAuthenticateDeliveryman,
  deliveryController.updateEndDate
);
