import { Router } from "express";
import { AuthController } from "../controllers";
import { Database } from "../data-source";
import { User } from "../entities";
import { authorize, protect } from "../middleware";
import { AuthService } from "../services";
import { safeAsync } from "../utils/helpers";

const AuthRouter = Router();
const userRepository = Database.getRepository(User);
const service = new AuthService(userRepository);
const controller = new AuthController(service);

AuthRouter.post('/login', safeAsync(controller.login));
AuthRouter.post('/register', safeAsync(controller.register));
AuthRouter.post('/logout', protect, safeAsync(controller.logout));
AuthRouter.get('/refresh', safeAsync(controller.refresh));

export default AuthRouter;