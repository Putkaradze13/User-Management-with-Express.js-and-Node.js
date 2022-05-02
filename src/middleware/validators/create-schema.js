import Joi from 'joi';

export const authSchema = Joi.object({
  first_name: Joi.string().required().min(3).max(24),
  last_name: Joi.string().required().min(3).max(24),
  user_name: Joi.string().required().min(3).max(32),
  password: Joi.string().required().min(3)
});
