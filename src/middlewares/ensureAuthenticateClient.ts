import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { TokenMissingException } from "../services/exceptionsHandler/genericsExceptions/TokenMissingException";
import { InvalidTokenException } from "../services/exceptionsHandler/genericsExceptions/InvalidTokenException";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticateClient(request: Request, response: Response, next: NextFunction) {
  try {

    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new TokenMissingException()
    }

    const [, token] = authHeader.split(" ");

    const { sub } = verify(token, "bbca61cf2f25de7dfbe347b803122fda") as IPayload;
    request.id_client = sub
    return next()
  } catch (error) {
    if (error instanceof TokenMissingException) {
      return response.status(error.status).json(error)
    }
    const invalidToken = new InvalidTokenException()
    return response.status(invalidToken.status).json(invalidToken)
  }
}