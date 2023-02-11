import { NextFunction, Request, Response } from "express";
import { Database } from "../data-source";
import { User } from "../entities";
import { UserService } from "../services";
import { decode } from "jsonwebtoken";
/**
 * Validate that the user is logged in, and has a valid token that is not expired.
 */
export const protect = async (req: Request, res: Response, next: NextFunction) => {
  if (req.headers.authorization && req.headers.authorization.toLowerCase().startsWith("bearer")) {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = decode(token) as { id: number, roles: string[], iat: number, exp: number };

    const service = new UserService(Database.getRepository(User));
    const user = await service.findUser(decodedToken?.id);

    if (user) {
      delete user.password;
      req.user = user;
      next();
    } else {
      return next(new Error('Invalid token! Please log in again.'));
    }

  } else {
    const error = new Error('Unauthenticated! Please log in and try again.');
    return next(error);
  }
}