import { userService } from '../service/user-service.js';
import { getAllUsersFilter } from '../utils/get-users-filter.js';

class UserController {
  async create(req, res, next) {
    try {
      res.data = {};
      const createdUser = await userService.createService(req.body);
      res.data = createdUser;
      next();
    } catch (err) {
      next(err);
    }
  }

  async update(req, res, next) {
    try {
      res.data = {};
      const { userId } = req.params;
      const updatedUser = await userService.updateService(userId, req.body, req.userData);
      res.data = updatedUser;
      next();
    } catch (err) {
      next(err);
    }
  }

  async getAllUsers(req, res, next) {
    try {
      res.data = {};
      const { page = 1, limit = 10, filter } = req.query;
      let newFilter = {};

      if (filter) {
        newFilter = getAllUsersFilter(filter);
      }

      const userList = await userService.getAllUserService(newFilter, (page - 1) * limit, limit);
      res.data = userList;
      res.pagination = {
        limit,
        skip: (page - 1) * limit,
        inPage: userList.length
      };
      next();
    } catch (err) {
      next(err);
    }
  }

  async getOneUser(req, res, next) {
    try {
      res.data = {};
      const { userId } = req.params;
      const oneUser = await userService.getOneUserService(userId);
      res.data = { user: oneUser };
      next();
    } catch (err) {
      next(err);
    }
  }

  async deleteUser(req, res, next) {
    try {
      res.data = {};
      const { userId } = req.params;
      const deletedUser = await userService.deleteService(userId, req.userData);
      res.data = deletedUser;
      next();
    } catch (err) {
      next(err);
    }
  }

  async forgotPassword(req, res, next) {
    try {
      res.data = {};
      const { email } = req.body;
      await userService.forgotPasswordService(email);
      res.data = { message: `Password reset link is sent to your email!` };
      next();
    } catch (err) {
      next(err);
    }
  }

  async resetPassword(req, res, next) {
    try {
      res.data = {};
      const { userId } = req.params;
      const { token } = req.params;
      const { password } = req.body;

      await userService.resetPasswordService(userId, token, password);

      res.data = { message: `Password is successfully reset!` };
      next();
    } catch (err) {
      next(err);
    }
  }
}

export const userController = new UserController();
