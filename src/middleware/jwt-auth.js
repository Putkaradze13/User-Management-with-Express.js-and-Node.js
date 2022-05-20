import jwt from 'jsonwebtoken';
import { userRepository } from '../DB/user-repository.js';
import { adminRepository } from '../DB/admin-repository.js';

export const jwtAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return next({ message: 'Not allowed' });

    const user = jwt.verify(token, process.env.JWT_KEY);
    if (user.type === 'client') {
      const userExists = await userRepository.findUserByEmail(user.email);
      req.userData = userExists;
      req.userData.type = 'client';
    } else if (user.type === 'admin') {
      const adminExists = await adminRepository.findAdminByEmail(user.email);
      req.userData = adminExists;
      req.userData.type = 'admin';
    }

    next();
  } catch (error) {
    next(error);
  }
};
