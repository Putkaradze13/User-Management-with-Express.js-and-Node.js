import mongoose from 'mongoose';
import mongoose_delete from 'mongoose-delete';
const Schema = mongoose.Schema;
import Joi from 'joi';

const userSchema = new Schema(
  {
    first_name: {},
    last_name: {},
    user_name: {},
    email: {},
    role: {
      type: String,
      default: 'user'
    },
    password: {}
  },
  { timestamps: true }
);

userSchema.plugin(mongoose_delete, { deletedAt: true });
const User = mongoose.model('User', userSchema);

const validateCreate = (user) => {
  const schema = Joi.object({
    first_name: Joi.string().required().min(3).max(24),
    last_name: Joi.string().required().min(3).max(24),
    user_name: Joi.string().alphanum().required().min(3).max(32),
    email: Joi.string().required().email(),
    role: Joi.string(),
    password: Joi.string().required().min(3)
  });
  return schema.validate(user);
};

const validateUpdate = (user) => {
  const schema = Joi.object({
    first_name: Joi.string().required().min(3).max(24),
    last_name: Joi.string().required().min(3).max(24),
    user_name: Joi.string().alphanum().required().min(3).max(32),
    username: Joi.string().alphanum().required().min(3).max(32),
    email: Joi.string().required().email(),
    role: Joi.string(),
    password: Joi.string().required().min(3)
  });
  return schema.validate(user);
};

export { User, validateCreate, validateUpdate };
