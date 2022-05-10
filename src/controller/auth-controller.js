import { authService } from '../service/auth-service.js';

class AuthController {
  async login(req, res, next) {
    try {
      res.body = {};
      const { user_name, password } = req.body;
      const { token } = await authService.loginService(user_name, password);
      res.body.token = token;
      next();
    } catch (err) {
      next(err);
    }
  }
}

export const authController = new AuthController();
