import 'dotenv/config';
import { userRepository } from '../DB/user-repository.js';
import { TokenRepository } from '../DB/token-repository.js';
import { validateCreate, validateUpdate } from '../model/user-schema.js';
import { validateForgotPass, validateResetPass } from '../model/token-schema.js';
import { sendEmail } from '../utils/sendMail.js';

class UsersService {
  constructor() {
    this.tokenRepository = new TokenRepository();
  }
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

  async updateService(data) {
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

  async forgotPasswordService(email) {
    const { error } = validateForgotPass(email);
    if (error) {
      throw new Error(error.details[0].message);
    }
    const user = await userRepository.findUserByEmail(email);
    if (!user) throw new Error(`User with given email doesn't exist`);

    let token = await this.tokenRepository.findTokenByUserId(user._id);
    if (!token) {
      token = await this.tokenRepository.createToken(user._id);
    }

    const link = `${process.env.BASE_URL}/password-reset/${user._id}/${token.token}`;
    await sendEmail(user.email, 'Password reset request', link);
    return link;
  }

  async resetPasswordService(userId, token, password) {
    const { error } = validateResetPass(password);
    if (error) {
      throw new Error(error.details[0].message);
    }

    const user = await userRepository.findUserById(userId);
    if (!user) throw new Error('Invalid link or expired!');
    const { _id } = user;

    const tokenExists = await this.tokenRepository.findUserToken(_id, token);
    if (!tokenExists) throw new Error('Invalid link or expired');

    await userRepository.resetPassword(userId, password);

    await this.tokenRepository.deleteTokenByUserId(user._id);
  }
}

export const usersService = new UsersService();
