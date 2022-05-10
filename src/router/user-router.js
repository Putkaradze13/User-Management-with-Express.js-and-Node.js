import { usersController } from '../controller/user-controllers.js';
import { jwtAuth } from '../middleware/jwt-auth.js';
import { Router } from 'express';

export const userRouter = new Router();
userRouter.post('/create', usersController.create);
userRouter.put('/update/:username', jwtAuth, usersController.update);
userRouter.get('/getAllUsers', usersController.getAllUsers);
userRouter.get('/getOneUser/:userId', usersController.getOneUser);
userRouter.delete('/deleteUser/:userId', jwtAuth, usersController.deleteUser);
