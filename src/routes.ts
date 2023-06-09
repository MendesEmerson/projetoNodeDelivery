import { Router } from "express";
import { ensureAuthenticateClient } from "./middlewares/ensureAuthenticateClient";
import { ensureAuthenticateDeliveryman } from "./middlewares/ensureAuthenticateDeliveryman";
import { AuthenticateClientController } from "./controller/authenticate/AuthenticateClientController";
import { AuthenticateDeliverymanController } from "./controller/authenticate/AuthenticateDeliverymanController";
import { FindAllDeliveriesCliientController } from "./controller/clients/FindAllDeliveriesController";
import { CreateClientController } from "./controller/clients/CreateClientController";
import { FindClientByIdController } from "./controller/clients/FindClientByIdController";
import { CreateDeliverymanController } from "./controller/deliveryman/CreateDeliverymanController";
import { FindAllDeliveriesDeliverymanController } from "./controller/deliveryman/FindAllDeliveriesController";
import { FindDeliverymanByIdController } from "./controller/deliveryman/FindDeliverymanByIdController";
import { CreateDeliveryController } from "./controller/clients/CreateDeliveryController";
import { FindAllAvailableController } from "./controller/deliveryman/FindAllAvailableController";
import { UpdateDeliveriesForDeliverymanController } from "./controller/deliveryman/UpdateDeliveriesForDeliverymanController";
import { UpdateDeliveriesEndDateController } from "./controller/deliveryman/UpdateDeliveriesEndDateController";
import { FindAllFinishDeliveriesDeliverymanController } from "./controller/deliveryman/FindAllFInishDeliveriesController";
import { FindAllAcceptedDeliveriesController } from "./controller/clients/FIndAllAceptedDeliveriesController";
import { CreateRestaurantController } from "./controller/restaurant/CreateRestaurantController";
import { ensureAuthenticateRestaurant } from "./middlewares/ensureAuthenticateRestaurant";
import { AuthenticateRestaurantController } from "./controller/authenticate/AuthenticateRestaurantController";
import { CreateItemRestaurantController } from "./controller/restaurant/CreateItemRestaurantController";
import { FindAllItensRestaurantController } from "./controller/restaurant/FindAllItensRestaurantController";
import { AddItemToCartController } from "./controller/cart/AddItemToCartController";
import { DeleteItemToCartController } from "./controller/cart/DeleteItemToCartController";
import { FindAllRestaurantController } from "./controller/restaurant/FindAllRestaurantsController";
import { FindOpenCartController } from "./controller/cart/FindOpenCartController";

export const routes = Router();

const authClient = new AuthenticateClientController()
const authDeliveryman = new AuthenticateDeliverymanController()
const authRestaurant = new AuthenticateRestaurantController()

const createClient = new CreateClientController()
const createDelivery = new CreateDeliveryController()
const findClientById = new FindClientByIdController()
const findAllDeliveriesClient = new FindAllDeliveriesCliientController()
const findAllAcceptedDeliveries = new FindAllAcceptedDeliveriesController()

const createDeliveryman = new CreateDeliverymanController()
const findAllAvailable = new FindAllAvailableController()
const findDeliverymanById = new FindDeliverymanByIdController()
const findAllDeliveriesDeliveryman = new FindAllDeliveriesDeliverymanController()
const findALlFinishDeliveriesDeliveryman = new FindAllFinishDeliveriesDeliverymanController()
const updatdeDeliveriesForDeliveryman = new UpdateDeliveriesForDeliverymanController()
const updatedDeliveriesEndDate = new UpdateDeliveriesEndDateController()

const createRestaurant = new CreateRestaurantController()
const createItemRestaurant = new CreateItemRestaurantController()
const findAllItensRestaurant = new FindAllItensRestaurantController()
const findAllRestaurantsOpen = new FindAllRestaurantController()

const findOpenCart = new FindOpenCartController()
const addItemToCart = new AddItemToCartController()
const deleteItemToCart = new DeleteItemToCartController()


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
  authClient.handle
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
  authDeliveryman.handle
);


routes.post(
  "/login/restaurant",
  authRestaurant.handle
)


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

routes.get(
  "/client/deliveries/accepted",
  ensureAuthenticateClient,
  findAllAcceptedDeliveries.handle
);


routes.get(
  "/client/cart/open",
  ensureAuthenticateClient,
  findOpenCart.handle
)

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

routes.post(
  "/client/cart/additem/:item_id",
  ensureAuthenticateClient,
  addItemToCart.handle
)

routes.delete(
  "/client/cart/deleteitem/:item_id",
  ensureAuthenticateClient,
  deleteItemToCart.handle
)

// ========================== Deliveryman ========================
routes.get(
  "/deliveryman",
  ensureAuthenticateDeliveryman,
  findDeliverymanById.handle
);

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /deliveryman/deliveries:
 *   get:
 *     tags: [Deliveries]
 *     description: List all deliveries for deliveryman
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of deliveries for deliveryman
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The ID of the delivery
 *                   example: uuid
 *                 id_client:
 *                   type: string
 *                   description: The ID of the client
 *                   example: uuid
 *                 id_deliveryman:
 *                   type: string
 *                   description: The ID of the deliveryman
 *                   example: uuid
 *                 item_name:
 *                   type: string
 *                   description: The name of the item
 *                   example: churrasco
 *                 created_at:
 *                   type: string
 *                   description: The creation date of the delivery
 *                   example: '2023-05-27T01:51:00.000Z'
 *                 end_at:
 *                   type: string
 *                   nullable: true
 *                   description: The end date of the delivery (null if not ended)
 *                   example: null
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: The error message
 *                   example: not found
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: The error message
 *                   example: Unauthorized
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: The error message
 *                   example: Internal Server Error
 */
routes.get(
  "/deliveryman/deliveries",
  ensureAuthenticateDeliveryman,
  findAllDeliveriesDeliveryman.handle
);



/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /deliveryman/avaliable:
 *   get:
 *     tags: [Deliveries]
 *     description: List all deliveries avaliable for deliveryman
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of deliveries avaliables for deliveryman
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The ID of the delivery
 *                   example: uuid
 *                 id_client:
 *                   type: string
 *                   description: The ID of the client
 *                   example: uuid
 *                 item_name:
 *                   type: string
 *                   description: The name of the item
 *                   example: churrasco
 *                 created_at:
 *                   type: string
 *                   description: The creation date of the delivery
 *                   example: '2023-05-27T01:51:00.000Z'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: The error message
 *                   example: not found
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: The error message
 *                   example: Unauthorized
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: The error message
 *                   example: Internal Server Error
 */
routes.get(
  "/delivery/available",
  ensureAuthenticateDeliveryman,
  findAllAvailable.handle
);


routes.get(
  "/deliveryman/deliveries/finish",
  ensureAuthenticateDeliveryman,
  findALlFinishDeliveriesDeliveryman.handle
)


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

routes.put(
  "/delivery/updateDeliveryman/:id_deliveries",
  ensureAuthenticateDeliveryman,
  updatdeDeliveriesForDeliveryman.handle
);

routes.put(
  "/delivery/updateEndDate/:id_delivery",
  ensureAuthenticateDeliveryman,
  updatedDeliveriesEndDate.handle
);


// ========================== Restaurant ========================

routes.get(
  "/restaurant/:restaurant_id",
  findAllItensRestaurant.handle
)

routes.get(
  "/restaurants",
  findAllRestaurantsOpen.handle
)

routes.post(
  "/restaurant",
  createRestaurant.handle
)

routes.post(
  "/restaurant/item",
  ensureAuthenticateRestaurant,
  createItemRestaurant.handle
)