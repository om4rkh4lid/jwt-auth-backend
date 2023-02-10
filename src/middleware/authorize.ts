import { NextFunction, Request, Response } from "express";

/**
 * Validate that the user has the correct permissions / role to access this resource
 */
export const authorize = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // TODO: authorization implementation
    if (roles.length > 0) next();
    throw new Error("You don't have the correct permissions to perform this action!");
  }
}