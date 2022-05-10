import { usersService } from '../service/user-services.js';

class UsersController {
  async create(req, res, next) {
    try {
      res.data = {};
      const createdUser = await usersService.createService(req.body);
      console.log(createdUser);
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
      const updatedUser = await usersService.updateService(userId, req.body);
      res.data = updatedUser;
      console.log(updatedUser);
      next();
    } catch (err) {
      next(err);
    }
  }

  async getAllUsers(req, res, next) {
    try {
      res.data = {};
      const { page = 1, limit = 10, filter = {} } = req.query;
      const userList = await usersService.getAllUserService(filter, page, limit);
      res.data = userList;
      res.pagination = {
        total: totalNumberOfUsersInDB,
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
      const { userId } = req.param;
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
      const deletedUser = await usersService.deleteService(userId);
      res.data = deletedUser;
      next();
    } catch (err) {
      next(err);
    }
  }
}

export const usersController = new UsersController();
