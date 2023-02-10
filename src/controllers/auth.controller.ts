import { NextFunction, Request, Response } from "express";
import { User } from "../entities";
import { AuthService } from "../services";
import { LoginCredentialsValidator, RegisterCredentialsValidator } from "../utils/validators";

export class AuthController {
  service: AuthService;

  constructor(service: AuthService) {
    this.service = service;
  }

  login = async (req: Request, res: Response, next: NextFunction) => {
    const credentials = req.body;
    const { error, value } = LoginCredentialsValidator.validate(credentials);

    if (error) {
      throw new Error(error.message);
    }

    const response = await this.service.login(credentials);

    /**
     * Note: You need to specify the 'domain' attribute on the cookie for res.clearCookie to work.
     */
    res.cookie('refresh_token', response.refreshToken, { httpOnly: true, sameSite: 'none', secure: true, maxAge: 30 * 60 * 60 * 24 * 1000, domain:'localhost' })
    
    res.status(200).json({ accessToken: response.accessToken, user: response.user });

  }

  register = async (req: Request, res: Response, next: NextFunction) => {
    const credentials = req.body;
    const { error, value } = RegisterCredentialsValidator.validate(credentials);

    if (error) {
      throw new Error(error.message);
    }

    const response = await this.service.register(credentials);
    
    res.status(200).json(response);

  }

  logout = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user
    console.log(user);
    if (user) {
      await this.service.logout(user);
      
      res.clearCookie('refresh_token', { httpOnly: true, sameSite: 'none', secure: true, domain:'localhost' })
      
      res.status(200).json({ message: 'Successfully logged out!'})
    } else {
      return next(new Error('Something went wrong while logging you out!'))
    }
  }

  refresh = async (req: Request, res: Response, next: NextFunction) => {
    const cookies = req.cookies;

    const refreshToken = cookies.refresh_token

    const response = await this.service.refresh(refreshToken)

    res.clearCookie('refresh_token', { httpOnly: true, sameSite: 'none', secure: true, domain:'localhost' })
    res.cookie('refresh_token', response.newRefreshToken, { httpOnly: true, sameSite: 'none', secure: true, maxAge: 30 * 60 * 60 * 24 * 1000, domain: 'localhost' })

    res.status(200).json({ accessToken: response.accessToken });
  }

}