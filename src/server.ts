import swaggerUi  from 'swagger-ui-express';
import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import { routes } from "./routes";
import { specs } from './swagger';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());
app.use(routes);
app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof Error) {
      return response.status(400).json({
        message: err.message,
      });
    }
    return response.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.listen(3001, () => {
  console.log(`Server is running on port 3001`);
  console.log('Swagger docs are available at http://localhost:3001/api-docs');
});
