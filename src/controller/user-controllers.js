import { usersService } from '../service/user-services.js';
import { getAllUsersFilter } from '../utils/get-users-filter.js';

class UsersController {
  async create(req, res, next) {
    try {
      res.data = {};
      const createdUser = await usersService.createService(req.body);
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
      const updatedUser = await usersService.updateService(userId, req.body, req.userData);
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

      const userList = await usersService.getAllUserService(newFilter, (page - 1) * limit, limit);
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
      const oneUser = await usersService.getOneUserService(userId);
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
      const deletedUser = await usersService.deleteService(userId, req.userData);
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
      await usersService.forgotPasswordService(email);
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

      await usersService.resetPasswordService(userId, token, password);

      res.data = { message: `Password is successfully reset!` };
      next();
    } catch (err) {
      next(err);
    }
  }
}

export const usersController = new UsersController();
