import { authService } from '../service/auth-service.js';

class AuthController {
  async login(req, res, next) {
    try {
      res.data = {};
      const { token } = await authService.loginService(req.body);
      res.data.token = token;
      next();
    } catch (err) {
      next(err);
    }
  }

  async whoami(req, res, next) {
    try {
      res.data = req.userData;
      console.log(req.userData);
      next();
    } catch (err) {
      next(err);
    }
  }
}

export const authController = new AuthController();
