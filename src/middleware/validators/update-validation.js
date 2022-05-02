import Joi from 'joi';

function updateSchema(req, res, next) {
  // define base schema rules
  const schemaRules = {
    first_name: Joi.string().required().min(3).max(24),
    last_name: Joi.string().required().min(3).max(24),
    password: Joi.string().required().min(3)
  };
}
