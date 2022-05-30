import Joi from 'joi';

export const validate = (schema) => {
  return (req, res, next) => {
    const { error } = Joi.validate(req.body, schema, { abortEarly: false });
    const valid = error == null;

    if (valid) {
      next();
    } else {
      return res.status(400).send({
        error: error.details.map((err) => err.message)
      });
    }
  };
};
