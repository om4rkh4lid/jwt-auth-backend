import { Request, Response, NextFunction } from "express";
import { UserService } from "../services";

export class UserController {
  service: UserService;

  constructor(service: UserService) {
    this.service = service;
  }

  getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    // get all users from the database
    const users = await this.service.getAllUsers();
    // return them in the response
    res.status(200).json(users);
  }
}