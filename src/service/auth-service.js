import 'dotenv/config';
import { userRepository } from '../DB/user-repository.js';
import { comparePasswords } from '../secure/hash.js';
import pkg from 'jsonwebtoken';
const jwt = pkg;

class AuthService {
  async loginService({ user_name, password }) {
    const userExists = await userRepository.findUser(user_name);

    if (!userExists) {
      throw new Error(`User '${user_name}' doesn't exist.`);
    }

    if (userExists.deleted === true) {
      throw new Error(`User '${user_name}' is deleted.`);
    }

    const match = await comparePasswords(password, userExists.password);
    if (!match) {
      throw new Error(`Invalid username or password!`);
    }

    const token = jwt.sign({ user_name }, process.env.JWT_KEY, { expiresIn: '24h' });
    return { token };
  }

  async whoamiService(userData) {
    const userExists = await userRepository.findUser(userData.user_name);
    return userExists;
  }
}

export const authService = new AuthService();
