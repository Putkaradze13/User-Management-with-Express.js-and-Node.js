import { authController } from '../controller/auth-controller.js';
import { Router } from 'express';
import { jwtAuth } from '../middleware/jwt-auth.js';
import { filterBody } from '../middleware/filter-body.js';
import { schemas } from '../utils/joi-schemas.js';
import { validate } from '../middleware/joi-validation.js';

export const authRouter = new Router();
authRouter.post(
  '/login',
  filterBody(['email', 'password', 'type']),
  validate(schemas.login),
  authController.login
);
authRouter.post('/whoami', jwtAuth, authController.whoami);
