import { Repository } from "typeorm";
import { User } from "../entities";

export class UserService {
  userRepository: Repository<User>;
  
  constructor(repository: Repository<User>) {
    this.userRepository = repository;
  }

  async findUser(id: number) {
    const user = await this.userRepository.findOne({ where: { id: id } });
    return user;
  }

  async getAllUsers() {
    const users = await this.userRepository.find();
    return users;
  }
}