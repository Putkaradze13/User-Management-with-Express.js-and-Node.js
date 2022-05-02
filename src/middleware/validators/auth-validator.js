import Joi from 'joi';

export const authSchema = Joi.object({
  user_name: Joi.string().required().min(3).max(32),
  password: Joi.string().required().min(3)
});
