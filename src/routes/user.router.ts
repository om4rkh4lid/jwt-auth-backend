import { Router } from "express";
import { safeAsync } from "../utils/helpers";
import { authorize, protect } from "../middleware";
import { UserController } from "../controllers";
import { UserService } from "../services";
import { Database } from "../data-source";
import { User } from "../entities";

const UserRouter = Router();
const userRepository = Database.getRepository(User);
const userService = new UserService(userRepository);
const userController = new UserController(userService);

UserRouter.get('/', protect, authorize(['user', 'editor', 'admin']), safeAsync(userController.getAllUsers))

export default UserRouter;