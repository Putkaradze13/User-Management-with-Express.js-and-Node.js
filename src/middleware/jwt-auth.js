import jwt from 'jsonwebtoken';
import { userRepository } from '../DB/user-repository.js';

export const jwtAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return next({ message: 'Not allowed' });

    const user = jwt.verify(token, process.env.JWT_KEY);
    const userExists = await userRepository.findUser(user.user_name);
    req.userData = userExists;
    next();
  } catch (error) {
    next(error);
  }
};
