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

export const routes = Router();

const deliveryController = new DeliveryController();


const authClientController = new AuthenticateClientController()
const authDeliverymanController = new AuthenticateDeliverymanController()

const createClient = new CreateClientController()
const createDelivery = new CreateDeliveryController()
const findClientById = new FindClientByIdController()
const findAllAvailable = new FindAllAvailableController()
const findAllDeliveriesClient = new FindAllDeliveriesCliientController()

const createDeliveryman = new CreateDeliverymanController()
const findDeliverymanById = new FindDeliverymanByIdController()
const findAllDeliveriesDeliveryman = new FindAllDeliveriesDeliverymanController()


// ========================== Login ========================
/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: API endpoints for authentication
 */

/**
 * @swagger
 * /login/client:
 *   post:
 *     tags: [Authentication]
 *     description: Authenticate user and generate token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: Client's username
 *               password:
 *                 type: string
 *                 description: Client's password
 *             required:
 *               - username
 *               - password
 *     responses:
 *       200:
 *         description: Client authenticated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Access token
 *             example:
 *               token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjM0NTY3ODkwIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
routes.post(
  "/login/client",
  authClientController.handle
);

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: API endpoints for authentication
 */

/**
 * @swagger
 * /login/deliveryman:
 *   post:
 *     tags: [Authentication]
 *     description: Authenticate deliveryman and generate token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: Deliveryman's username
 *               password:
 *                 type: string
 *                 description: Deliveryman's password
 *             required:
 *               - username
 *               - password
 *     responses:
 *       200:
 *         description: Deliveryman authenticated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Access token
 *             example:
 *               token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjM0NTY3ODkwIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
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

/**
 * @swagger
 * tags:
 *   name: Client
 *   description: API endpoints for clients
 */

/**
 * @swagger
 * /client:
 *   post:
 *     tags: [Client]
 *     description: Create client
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: Client's username
 *               password:
 *                 type: string
 *                 description: Client's password
 *             required:
 *               - username
 *               - password
 *     responses:
 *       201:
 *         description: Client created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 username:
 *                   type: string
 *                   description: Client username
 *                 password:
 *                   type: string
 *                   description: Client password
 *             example:
 *               username: usuario
 *               password: senha123
 *       400:
 *         description: Bad request
 *       409:
 *         description: User already exists
 *       500:
 *         description: Internal server error
 */
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


/**
 * @swagger
 * /deliveryman:
 *   post:
 *     tags: [Deliveryman]
 *     description: Create Deliveryman
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: Deliveryman's username
 *               password:
 *                 type: string
 *                 description: Deliveryman's password
 *             required:
 *               - username
 *               - password
 *     responses:
 *       201:
 *         description: Deliveryman created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 username:
 *                   type: string
 *                   description: Client username
 *                 password:
 *                   type: string
 *                   description: Client password
 *             example:
 *               username: usuario
 *               password: senha123
 *       400:
 *         description: Bad request
 *       409:
 *         description: User already exists
 *       500:
 *         description: Internal server error
 */
routes.post(
  "/deliveryman",
  createDeliveryman.handle
);


// ========================== Deliveries ========================



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
