import Joi from "joi";

export const LoginCredentialsValidator = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});