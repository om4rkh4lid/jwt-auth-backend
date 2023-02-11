import { decode } from "jsonwebtoken";
import { Repository } from "typeorm";
import { User } from "../entities";
import { LoginCredentials, RegisterCredentials } from "../utils/DTOs";
import { generateAccessToken, generateRefreshToken, verifyPassword} from "../utils/helpers";
import { encryptPassword } from "../utils/helpers/encrypt-password";

export class AuthService {
  userRepository: Repository<User>;

  constructor(userRepository: Repository<User>) {
    this.userRepository = userRepository;
  }

  login = async (credentials: LoginCredentials) => {
    const user = await this.userRepository.findOne({ where: { email: credentials.email } });
    if (user && user.password && await verifyPassword(credentials.password, user.password)) {
      const accessToken = generateAccessToken({ id: user.id });
      const refreshToken = generateRefreshToken({ email: user.email });
      user.refreshToken = refreshToken
      await this.userRepository.save(user);
      return { accessToken, user: { email: user.email, id: user.id, roles: user.roles }, refreshToken };
    } else {
      throw new Error("Invalid credentials! Try again.");
    }
  }

  register = async (credentials: RegisterCredentials) => {
    if (credentials.password === credentials.confirmPassword) {
      const encryptedPassword = await encryptPassword(credentials.password)
      const user = await this.userRepository.create({ email: credentials.email, password: encryptedPassword });
      await this.userRepository.save(user);
      return { email: user.email };
    } else {
      throw new Error('Your passwords must match. Please try again!');
    }
  }

  logout = async (user: User) => {
    user.refreshToken = '';
    await this.userRepository.save(user);
  }

  refresh = async (refreshToken: string) => {
    const decodedToken = decode(refreshToken) as { email: string }
    const user = await this.userRepository.findOne({ where: { email: decodedToken.email } });
    if ( user && decodedToken.email && user.email === decodedToken.email ) {
      const accessToken = generateAccessToken({ id: user.id });
      const newRefreshToken = generateRefreshToken({ email: user.email });
      user.refreshToken = newRefreshToken
      await this.userRepository.save(user);
      return { accessToken, newRefreshToken };
    } else {
      throw new Error("Unauthorized! Please log in again");
    }

  }

}