import { Router, Request, Response } from "express";
import AuthRouter from "./auth.router";
import UserRouter from "./user.router";

const AppRouter: Router = Router();

// Set up API routes
AppRouter.get('/healthCheck', (req: Request, res: Response) => { res.sendStatus(200); });

// Add resource routers
AppRouter.use('/auth', AuthRouter);
AppRouter.use('/users', UserRouter);

export default AppRouter;