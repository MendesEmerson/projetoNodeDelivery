import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import express from 'express';
import path from 'path';

const app = express();

  const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'API Documentation For Delivery Services',
        version: '1.0.0',
        description: 'Documentação da API de Entregas',
        host:"localhost:3001",
        contact: [{
          name: "Juan Cassiano", // your name
          email: "juancassiano@hotmail.com", // your email
          url: "github.com/juancassiano", // your website
        },{
          name: "Emerson Mendes", // your name
          email: "omendesemerson@gmail.com", // your email
          url: "github.com/mendesemerson", 
        }],
      
        tags: [
          { name: 'Clients', description: 'API endpoints for clients' },
          { name: 'Deliveryman', description: 'API endpoints for deliveryman' },
          { name: 'Delivery', description: 'API endpoints for delivery' },
        ],
      },
    },
    apis: [path.resolve(__dirname, 'routes.ts')]
  };

  export const specs = swaggerJsdoc(options);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));