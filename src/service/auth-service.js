import 'dotenv/config';
import { userRepository } from '../DB/user-repository.js';
import { adminRepository } from '../DB/admin-repository.js';
import { comparePasswords } from '../secure/hash.js';
import pkg from 'jsonwebtoken';
const jwt = pkg;

class AuthService {
  async loginService({ email, password, type }) {
    if (type === 'client') {
      const userExists = await userRepository.findUserByEmail(email);

      if (!userExists) {
        throw new Error(`User with given email doesn't exist.`);
      }

      if (userExists.deleted === true) {
        throw new Error(`User with given email is deleted.`);
      }

      const match = await comparePasswords(password, userExists.password);
      if (!match) {
        throw new Error(`Invalid email or password!`);
      }
    } else if (type === 'admin') {
      const adminExists = await adminRepository.findAdminByEmail(email);

      if (!adminExists) {
        throw new Error(`admin with given email doesn't exist.`);
      }

      if (adminExists.deleted === true) {
        throw new Error(`admin with given email is deleted.`);
      }

      const match = await comparePasswords(password, adminExists.password);
      if (!match) {
        throw new Error(`Invalid email or password!`);
      }
    }
    const token = jwt.sign({ email, type }, process.env.JWT_KEY, { expiresIn: '24h' });
    return { token };
  }

  async whoamiService(userData) {
    return userData;
  }
}

export const authService = new AuthService();
