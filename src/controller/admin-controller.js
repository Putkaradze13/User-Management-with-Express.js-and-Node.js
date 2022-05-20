import { adminService } from '../service/admin-service.js';

class AdminController {
  async create(req, res, next) {
    try {
      res.data = {};
      const createdAdmin = await adminService.createAdminService(req.body, req.userData);
      res.data = createdAdmin;
      next();
    } catch (err) {
      next(err);
    }
  }

  async deleteAdmin(req, res, next) {
    try {
      res.data = {};
      const { userId } = req.params;
      const deletedAdmin = await adminService.deleteService(userId, req.userData);
      res.data = deletedAdmin;
      next();
    } catch (err) {
      next(err);
    }
  }
}
export const adminController = new AdminController();
