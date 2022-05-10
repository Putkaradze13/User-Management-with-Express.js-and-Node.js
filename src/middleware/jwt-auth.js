import jwt from 'jsonwebtoken';

export const jwtAuth = (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return next({ message: 'Not allowed' });

    jwt.verify(token, process.env.JWT_KEY, (err, userExists) => {
      if (err) {
        return next({ message: 'Invalid Token' });
      }
      req.userData = userExists;
      next();
    });
  } catch (error) {
    next(error);
  }
};
