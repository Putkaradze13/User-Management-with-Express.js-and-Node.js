import { usersController } from '../controller/user-controllers.js';
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
  usersController.create
);
userRouter.put(
  '/update/:userId',
  filterBody(['first_name', 'last_name', 'email', 'password']),
  jwtAuth,
  validate(schemas.update),
  usersController.update
);
userRouter.get('/', usersController.getAllUsers);
userRouter.get('/:userId', usersController.getOneUser);
userRouter.delete('/:userId', jwtAuth, usersController.deleteUser);
userRouter.post(
  '/forgotPassword',
  validate(schemas.forgotPassword),
  usersController.forgotPassword
);
userRouter.post(
  '/resetPassword/:userId/:token',
  validate(schemas.resetPassword),
  usersController.resetPassword
);
