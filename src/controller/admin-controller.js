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

  async forgotPassword(req, res, next) {
    try {
      res.data = {};
      const { email } = req.body;
      await adminService.forgotPasswordService(email);
      res.data = { message: `Password reset link is sent to your email!` };
      next();
    } catch (err) {
      next(err);
    }
  }

  async resetPassword(req, res, next) {
    try {
      res.data = {};
      const { adminId } = req.params;
      const { token } = req.params;
      const { password } = req.body;

      await adminService.resetPasswordService(adminId, token, password);

      res.data = { message: `Password is successfully reset!` };
      next();
    } catch (err) {
      next(err);
    }
  }
}
export const adminController = new AdminController();
