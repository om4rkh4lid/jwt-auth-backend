import { Request, Response, NextFunction } from "express"

export const safeAsync = (requestHandler: (req: Request, res: Response, next: NextFunction) => Promise<void>)  => {
  return (req: Request, res: Response, next: NextFunction) => {
    requestHandler(req, res, next).catch(next);
  }
}