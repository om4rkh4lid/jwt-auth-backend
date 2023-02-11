import { NextFunction, Request, Response } from "express";

/**
 * Validate that the user has the correct permissions / role to access this resource
 */
export const authorize = (allowed: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user; 
    if (user && user.roles && (user.roles as any as string[]).find(role => allowed.includes(role))) {
      return next()
    }
    return next(new Error("You don't have the correct permissions to perform this action!"));
  }
}