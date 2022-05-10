import jwt from 'jsonwebtoken';
import { userRepository } from '../DB/user-repository.js';

export const jwtAuth = (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
      if (err) {
        return next({ message: 'Invalid Token' });
      }
      const { user_name } = decoded;
      req.userData = userRepository.findUser(user_name);
      next();
    });
  } catch (error) {
    next(error);
  }
};
