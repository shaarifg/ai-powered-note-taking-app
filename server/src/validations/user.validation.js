import Joi from "joi";

export const userSchema = Joi.object({
  username: Joi.string().min(3).max(30).required("username is required"),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});
