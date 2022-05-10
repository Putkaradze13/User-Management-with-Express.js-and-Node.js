import { authService } from '../service/auth-service.js';

class AuthController {
  async login(req, res, next) {
    try {
      res.body = {};
      const { token } = await authService.loginService(req.body);
      res.body.token = token;

      next();
    } catch (err) {
      next(err);
    }
  }
}

export const authController = new AuthController();
