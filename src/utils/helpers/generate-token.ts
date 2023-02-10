import { sign } from "jsonwebtoken";

export const generateAccessToken = (payload: any) => {
  // This is force unwrapped because if it's not there, something is definitely wrong!
  const secretKey = process.env.ACCESS_TOKEN_SECRET_KEY!;
  const expiresIn = process.env.ACCESS_TOKEN_EXPIRES_IN;
  return sign(payload, secretKey, { expiresIn })
}

export const generateRefreshToken = (payload: any) => {
  // This is force unwrapped because if it's not there, something is definitely wrong!
  const secretKey = process.env.REFRESH_TOKEN_SECRET_KEY!;
  const expiresIn = process.env.REFRESH_TOKEN_EXPIRES_IN;
  return sign(payload, secretKey, { expiresIn })
}