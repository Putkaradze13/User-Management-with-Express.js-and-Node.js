import { usersService } from '../service/user-services.js';

class UsersController {
  async create(req, res, next) {
    try {
      res.data = {};
      const { first_name, last_name, user_name, role, password } = req.body;
      await usersService.createService({ first_name, last_name, user_name, role, password });
      res.data = { message: `User '${user_name}' successfully created.` };
      next();
    } catch (err) {
      next({ message: err.message });
    }
  }

  async update(req, res, next) {
    try {
      res.data = {};
      const { username } = req.params;
      const { user_name, role } = req.userData;

      const { first_name, last_name, password } = req.body;
      await usersService.updateService({
        username,
        first_name,
        last_name,
        password,
        role,
        user_name
      });
      res.data = { message: 'User information updated!' };
      next();
    } catch (err) {
      next({ message: err.message });
    }
  }

  async getAllUsers(req, res, next) {
    try {
      res.data = {};
      const { page, limit } = req.query;
      const userList = await usersService.getAllUserService(page, limit);
      res.data = { users: userList };

      next();
    } catch (err) {
      next({ message: err.message });
    }
  }

  async getOneUser(req, res, next) {
    try {
      res.data = {};
      const { user_name } = req.body;
      const oneUser = await usersService.getOneUserService(user_name);
      res.data = { user: oneUser };

      next();
    } catch (err) {
      next({ message: err.message });
    }
  }

  async deleteUser(req, res, next) {
    try {
      res.data = {};
      const { username } = req.params;
      const { user_name, role } = req.userData;

      await usersService.deleteService(username, role, user_name);
      res.data = { message: `User ${username} has been deleted!` };
      next();
    } catch (err) {
      next({ message: err.message });
    }
  }
}

export const usersController = new UsersController();
