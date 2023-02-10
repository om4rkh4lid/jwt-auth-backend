import Joi from "joi";

export const RegisterCredentialsValidator = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  confirmPassword: Joi.string().required()
});