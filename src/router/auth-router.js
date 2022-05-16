import { authController } from '../controller/auth-controller.js';
import { Router } from 'express';
import { jwtAuth } from '../middleware/jwt-auth.js';
import { filterBody } from '../middleware/filter-body.js';
import { joiValidation } from '../middleware/joi-validation.js';

export const authRouter = new Router();
authRouter.post(
  '/login',
  filterBody(['user_name', 'password']),
  joiValidation.validateUserlogin,
  authController.login
);
authRouter.post('/whoami', jwtAuth, authController.whoami);
