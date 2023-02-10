import { Request, Response, NextFunction } from "express";

export const globalErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(err);
  if (err.message.startsWith('Invalid token')) {
    res.status(403).json({ message: err.message });
  }
  res.status(400).json({ message: err.message });
}