import Joi from 'joi';

export const schemas = {
  create: Joi.object().keys({
    first_name: Joi.string().required().min(3).max(24),
    last_name: Joi.string().required().min(3).max(24),
    user_name: Joi.string().alphanum().required().min(3).max(32),
    email: Joi.string().required().email().lowercase(),
    password: Joi.string().required().min(3)
  }),

  update: Joi.object().keys({
    first_name: Joi.string().required().min(3).max(24),
    last_name: Joi.string().required().min(3).max(24),
    email: Joi.string().required().email().lowercase(),
    password: Joi.string().required().min(3)
  }),

  login: Joi.object().keys({
    user_name: Joi.string().alphanum().required().min(3).max(32),
    password: Joi.string().required().min(3)
  }),

  forgotPassword: Joi.object().keys({
    email: Joi.string().required().email().lowercase()
  }),

  resetPassword: Joi.object().keys({
    password: Joi.string().required().min(3)
  })
};
