import { adminService } from '../service/admin-service.js';

class AdminController {
  async create(req, res, next) {
    try {
      res.data = {};
      console.log(req.userData);
      const createdAdmin = await adminService.createAdminService(req.body, req.userData);
      res.data = createdAdmin;
      next();
    } catch (err) {
      next(err);
    }
  }
}
export const adminController = new AdminController();
