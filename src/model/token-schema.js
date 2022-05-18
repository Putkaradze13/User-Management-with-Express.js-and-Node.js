import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import Joi from 'joi';

const tokenSchema = new Schema({
  userId: {
    type: Object,
    required: true,
    ref: 'user'
  },
  token: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  }
});

const Token = mongoose.model('Token', tokenSchema);

const validateForgotPass = (email) => {
  const schema = Joi.object({
    email: Joi.string().required().email()
  });
  return schema.validate({ email });
};

const validateResetPass = (password) => {
  const schema = Joi.object({
    password: Joi.string().required().min(3)
  });
  return schema.validate({ password });
};

export { Token, validateForgotPass, validateResetPass };
