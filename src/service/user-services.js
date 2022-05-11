import { userRepository } from '../DB/user-repository.js';
import { validateCreate, validateUpdate } from '../model/user-schema.js';

class UsersService {
  async createService(data) {
    const { error } = validateCreate(data);
    if (error) {
      throw new Error(error.details[0].message);
    }

    const userExists = await userRepository.findUser(data.user_name);

    if (userExists) {
      throw new Error(`User '${data.user_name}' already exists.`);
    }

    return await userRepository.createUser({
      first_name: data.first_name,
      last_name: data.last_name,
      user_name: data.user_name,
      email: data.email,
      password: data.password
    });
  }

  async updateService(userId, data) {
    const { error } = validateUpdate(data);
    if (error) {
      throw new Error(error.details[0].message);
    }

    if (!data.password) {
      throw new Error('Please, provide password.');
    }

    return await userRepository.updateUser(userId, data);
  }

  async getAllUserService(filter, page, limit) {
    return await userRepository.findAllUsers(filter, parseInt(page), parseInt(limit));
  }

  async getOneUserService(userId) {
    const userExists = await userRepository.findUserById(userId);

    if (!userExists) {
      throw new Error(`User with given id doesn't exist.`);
    }
    if (userExists.deleted === true) {
      throw new Error(`User with given id is deleted`);
    }

    return userExists;
  }

  async deleteService(userId) {
    await userRepository.findUserById(userId);

    return userRepository.deleteUserById(userId);
  }
}

export const usersService = new UsersService();
