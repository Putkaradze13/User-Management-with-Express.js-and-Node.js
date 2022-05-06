import { userRepository } from '../DB/user-repository.js';
import { comparePasswords } from '../secure/hash.js';
import pkg from 'jsonwebtoken';
const jwt = pkg;

class AuthService {
  async loginService(user_name, password) {
    const userExists = await userRepository.findUser(user_name);

    if (user_name.length < 1 || password.length < 1) {
      throw new Error(`Please input username and password!`);
    }

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
    return jwt.sign({ user_name, role: userExists.role }, process.env.JWT_KEY, {
      expiresIn: '24h'
    });
  }
}

export const authService = new AuthService();
