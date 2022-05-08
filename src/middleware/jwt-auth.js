import 'dotenv/config';
import jwt from 'jsonwebtoken';

export const jwtAuth = (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
      if (err) return res.status(403).send({ message: 'Invalid Token' });
      const { user_name, role } = decoded;
      req.userData = { user_name, role };
      next();
    });
  } catch (error) {
    next(error);
  }
};
