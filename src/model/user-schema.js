import mongoose from 'mongoose';
import mongoose_delete from 'mongoose-delete';
import Joi from 'joi';
const Schema = mongoose.Schema;

const user = new Schema(
  {
    first_name: {},
    last_name: {},
    user_name: {},
    email: {},
    password: {}
  },
  { timestamps: true }
);

user.plugin(mongoose_delete, { deletedAt: true });
const User = mongoose.model('User', user);

const validateCreate = (user) => {
  const schema = Joi.object({
    first_name: Joi.string().required().min(3).max(24),
    last_name: Joi.string().required().min(3).max(24),
    user_name: Joi.string().alphanum().required().min(3).max(32),
    email: Joi.string().required().email().lowercase(),
    password: Joi.string().required().min(3)
  });
  return schema.validate(user);
};

const validateUpdate = (user) => {
  const schema = Joi.object({
    first_name: Joi.string().required().min(3).max(24),
    last_name: Joi.string().required().min(3).max(24),
    email: Joi.string().required().email().lowercase(),
    password: Joi.string().required().min(3)
  });
  return schema.validate(user);
};

const validateLogin = (user) => {
  const schema = Joi.object({
    user_name: Joi.string().alphanum().required().min(3).max(32),
    password: Joi.string().required().min(3)
  });
  return schema.validate(user);
};

export { User, validateCreate, validateUpdate, validateLogin };
