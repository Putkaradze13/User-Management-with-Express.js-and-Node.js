import { userController } from '../controller/user-controller.js';
import { jwtAuth } from '../middleware/jwt-auth.js';
import { Router } from 'express';
import { filterBody } from '../middleware/filter-body.js';
import { schemas } from '../model/joi-schemas.js';
import { validate } from '../middleware/joi-validation.js';

export const userRouter = new Router();
userRouter.post(
  '/create',
  filterBody(['first_name', 'last_name', 'user_name', 'email', 'password']),
  validate(schemas.create),
  userController.create
);
userRouter.put(
  '/update/:userId',
  filterBody(['first_name', 'last_name', 'email', 'password']),
  jwtAuth,
  validate(schemas.update),
  userController.update
);
userRouter.get('/', userController.getAllUsers);
userRouter.get('/:userId', userController.getOneUser);
userRouter.delete('/:userId', jwtAuth, userController.deleteUser);
userRouter.post('/forgotPassword', validate(schemas.forgotPassword), userController.forgotPassword);
userRouter.post(
  '/resetPassword/:userId/:token',
  validate(schemas.resetPassword),
  userController.resetPassword
);
