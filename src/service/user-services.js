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

    await userRepository.createUser({
      first_name: data.first_name,
      last_name: data.last_name,
      user_name: data.user_name,
      email: data.email,
      password: data.password
    });
  }

  async updateService(data) {
    console.log(data);
    const { error } = validateUpdate(data);
    if (error) {
      throw new Error(error.details[0].message);
    }

    if (!data.password) {
      throw new Error('Please, provide password.');
    }

    if (data.role !== 'admin' && data.username !== data.user_name) {
      throw new Error('Not allowed');
    }

    return await userRepository.updateUser(data);
  }

  async getAllUserService(filter, page, limit) {
    return userRepository.findAllUsers(filter, parseInt(page), parseInt(limit));
  }

  async getOneUserService(userId) {
    const userExists = await userRepository.findUser(userId);

    if (!userExists) {
      throw new Error(`User with given id doesn't exist.`);
    }
    if (userExists.deleted === true) {
      throw new Error(`User with given id is deleted`);
    }

    return userRepository.findOneUser(userId);
  }

  async deleteService(userId) {
    await userRepository.findUserById(userId);

    return userRepository.deleteUserById(userId);
  }
}

export const usersService = new UsersService();
