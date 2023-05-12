import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticateClient(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      error: "Token missing",
    });
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub } = verify(token, "bbca61cf2f25de7dfbe347b803122fda") as IPayload;
    req.id_client = sub
    return next()
  } catch (error) {
    return res.status(401).json({
      error: "Invalid token",
    });
  }
}
