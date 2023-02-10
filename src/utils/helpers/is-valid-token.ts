import { verify } from "jsonwebtoken";
import { Database } from "../../data-source";
import { User } from "../../entities";
import { UserService } from "../../services/user.service";

/**
 * Decodes the token or throws an error if it's invalid or expires.
 * @param token The encrypted token
 * @returns The unencrypted payload
 */
export const decode = (token: string) => {
  return verify(token, process.env.ACCESS_TOKEN_SECRET_KEY!); 
}