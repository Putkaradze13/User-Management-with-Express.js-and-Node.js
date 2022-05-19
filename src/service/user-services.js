import 'dotenv/config';
import { userRepository } from '../DB/user-repository.js';
import { tokenRepository } from '../DB/token-repository.js';
import { sendEmail } from '../utils/send-mail.js';

class UsersService {
  async createService(data) {
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

  async updateService(userId, data, userData) {
    if (userId != userData._id) {
      throw new Error('Not allowed');
    }

    await userRepository.updateUser(userId, data);

    return await userRepository.findUserById(userId);
  }

  async getAllUserService(filter, skip, limit) {
    return await userRepository.findAllUsers(filter, parseInt(skip), parseInt(limit));
  }

  async getOneUserService(userId) {
    const userExists = await userRepository.findUserById(userId);

    if (!userExists) {
      throw new Error(`User with given id doesn't exist.`);
    }
    if (userExists.deleted === true) throw new Error(`User with given id is deleted`);

    return userExists;
  }

  async deleteService(userId, userData) {
    if (userId != userData._id) throw new Error('Not allowed');

    if (userData.deleted === true) throw new Error(`User is already deleted!`);

    await userRepository.deleteUserById(userId);
    return await userRepository.findUserById(userId);
  }

  async forgotPasswordService(email) {
    const user = await userRepository.findUserByEmail(email);
    if (!user) throw new Error(`User with given email doesn't exist`);

    let token = await tokenRepository.findTokenByUserId(user._id);
    if (token) {
      await tokenRepository.deleteTokenByUserId(user._id);
    }
    token = await tokenRepository.createToken(user._id);

    const link = `${process.env.BASE_URL}/user/resetPassword/${user._id}/${token.token}`;
    await sendEmail(user.email, 'Reset password request', link);
    return link;
  }

  async resetPasswordService(userId, token, password) {
    const user = await userRepository.findUserById(userId);
    if (!user) throw new Error('Invalid link or expired!');
    const { _id } = user;

    const tokenExists = await tokenRepository.findUserToken(_id, token);
    if (!tokenExists) throw new Error('Invalid link or expired');

    await userRepository.resetPassword(userId, password);

    await tokenRepository.deleteTokenByUserId(user._id);
  }
}

export const usersService = new UsersService();
