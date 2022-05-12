import { validateCreate, validateUpdate, validateLogin } from '../model/user-schema.js';

class JoiValidation {
  async validateUserCreate(req, res, next) {
    const { error } = validateCreate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    next();
  }

  async validateUserUpdate(req, res, next) {
    const { error } = validateUpdate(req.body);
    if (error) {
      return res.status(400).send({
        error: error.details[0].message
      });
    }
    next();
  }

  async validateUserlogin(req, res, next) {
    const { error } = validateLogin(req.body);
    if (error) {
      return res.status(400).send({
        error: error.details[0].message
      });
    }
    next();
  }
}

export const joiValidation = new JoiValidation();
