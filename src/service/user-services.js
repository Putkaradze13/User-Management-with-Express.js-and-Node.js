import 'dotenv/config';
import { userRepository } from '../DB/user-repository.js';

class UsersService {
  async createService(data) {
    const userExists = await userRepository.findUser(data.user_name);

    if (userExists) {
      throw new Error(`User '${data.user_name}' already exists.`);
    }

    await userRepository.createUser({
      first_name: data.first_name,
      last_name: data.last_name,
      user_name: data.user_name,
      role: data.role,
      password: data.password
    });
  }

  async updateService(data) {
    if (!data.password) {
      throw new Error('Please, provide password.');
    }

    if (data.role !== 'admin' && data.username !== data.user_name) {
      throw new Error('Not allowed');
    }

    return await userRepository.updateUser(data);
  }

  async getAllUserService(page, limit) {
    return userRepository.findAllUsers(parseInt(page), parseInt(limit));
  }

  async getOneUserService(user_name) {
    const userExists = await userRepository.findUser(user_name);

    if (!userExists) {
      throw new Error(`User '${user_name}' doesn't exist.`);
    }
    if (userExists.deketed === true) {
      throw new Error(`User '${user_name}' is deleted`);
    }

    return userRepository.findOneUser(user_name);
  }

  async deleteService(user_name, role, username) {
    await userRepository.findUser(user_name);

    if (role !== 'admin' && username !== user_name) {
      throw new Error('Not allowed');
    }

    return userRepository.deleteUser(user_name);
  }
}

export const usersService = new UsersService();
