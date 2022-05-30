import { adminController } from '../controller/admin-controller.js';
import { Router } from 'express';
import { filterBody } from '../middleware/filter-body.js';
import { schemas } from '../utils/joi-schemas.js';
import { validate } from '../middleware/joi-validation.js';
import { jwtAuth } from '../middleware/jwt-auth.js';

export const adminRouter = new Router();
adminRouter.post(
  '/create',
  filterBody(['first_name', 'last_name', 'email', 'password']),
  jwtAuth,
  validate(schemas.createAdmin),
  adminController.create
);
adminRouter.delete('/:userId', jwtAuth, adminController.deleteAdmin);
adminRouter.post(
  '/forgotPassword',
  validate(schemas.forgotPassword),
  adminController.forgotPassword
);
adminRouter.post(
  '/resetPassword/:adminId/:token',
  validate(schemas.resetPassword),
  adminController.resetPassword
);
