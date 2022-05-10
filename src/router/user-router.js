import { usersController } from '../controller/user-controllers.js';
import { jwtAuth } from '../middleware/jwt-auth.js';
import { Router } from 'express';

export const userRouter = new Router();
userRouter.post('/create', usersController.create);
userRouter.put('/update/:userId', jwtAuth, usersController.update);
userRouter.get('/', usersController.getAllUsers);
userRouter.get('/:userId', usersController.getOneUser);
userRouter.delete('/:userId', jwtAuth, usersController.deleteUser);
