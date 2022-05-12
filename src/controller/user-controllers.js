import { usersService } from '../service/user-services.js';

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
      const updatedUser = await usersService.updateService(userId, req.body);
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
      const newFilter = {};
      if (filter !== undefined) {
        const filterKeyValue = filter.split('==');
        newFilter[filterKeyValue[0]] = filterKeyValue[1];
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
      const deletedUser = await usersService.deleteService(userId);
      res.data = deletedUser;
      next();
    } catch (err) {
      next(err);
    }
  }
}

export const usersController = new UsersController();
