import { usersController } from '../controller/user-controllers.js';
import { jwtAuth } from '../middleware/jwt-auth.js';
import { Router } from 'express';

export const userRouter = new Router();
userRouter.post('/create', usersController.create);
userRouter.put('/update/:username', jwtAuth, usersController.update);
userRouter.get('/getAllUsers', usersController.getAllUsers);
userRouter.get('/getOneUser', usersController.getOneUser);
userRouter.delete('/deleteUser/:username', jwtAuth, usersController.deleteUser);
userRouter.post('/forgotPassword', usersController.forgotPassword);
userRouter.post('/password-reset/:userId/:token', usersController.resetPassword);
