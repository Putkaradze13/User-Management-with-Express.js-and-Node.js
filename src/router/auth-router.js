import { authController } from '../controller/auth-controller.js';
import { Router } from 'express';

export const authRouter = new Router();
authRouter.post('/login', authController.login);
