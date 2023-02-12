import { NextFunction, Request, Response } from "express";
import { Database } from "../data-source";
import { User } from "../entities";
import { UserService } from "../services";
import { decode, SigningKeyCallback, verify } from "jsonwebtoken";
import { promisify } from "util";

/**
 * Validate that the user is logged in, and has a valid token that is not expired.
 */
export const protect = async (req: Request, res: Response, next: NextFunction) => {
  if (req.headers.authorization && req.headers.authorization.toLowerCase().startsWith("bearer")) {
    const token: string = req.headers.authorization.split(" ")[1];
    const asyncVerifyToken = promisify(verify) as (token: string, secret: string) => Promise<SigningKeyCallback>;

    try {
      const decoded = await asyncVerifyToken(token, process.env.ACCESS_TOKEN_SECRET_KEY!) as any as { id: number, roles: string[], iat: number, exp: number };;
      const service = new UserService(Database.getRepository(User));
      const user = await service.findUser(decoded.id);
      if (user) {
        delete user.password;
        req.user = user;
        next();
      } else {
        return next(new Error('Invalid token! Please log in again.'));
      }
    } catch (error) {
      console.log(error);
      return next(new Error('Unauthenticated! Something is wrong with your token!'));

    }
  } else {
    const error = new Error('Unauthenticated! Please log in and try again.');
    return next(error);
  }
}