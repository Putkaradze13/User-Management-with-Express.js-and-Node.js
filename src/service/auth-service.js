import { userRepository } from '../DB/user-repository.js';
import { adminRepository } from '../DB/admin-repository.js';
import { comparePasswords } from '../secure/hash.js';
import pkg from 'jsonwebtoken';
const jwt = pkg;

class AuthService {
  async loginService({ email, password, type }) {
    let user;
    if (type === 'client') {
      user = await userRepository.findUserByEmail(email);
    } else if (type === 'admin') {
      user = await adminRepository.findAdminByEmail(email);
    }
    if (!user) {
      throw new Error(`User with given email doesn't exist.`);
    }

    if (user.deleted === true) {
      throw new Error(`User with given email is deleted.`);
    }

    const match = await comparePasswords(password, user.password);
    if (!match) {
      throw new Error(`Invalid email or password!`);
    }

    const token = jwt.sign({ email, type }, process.env.JWT_KEY, { expiresIn: '24h' });
    return { token };
  }
}

export const authService = new AuthService();
