import { authService } from '../service/auth-service.js';

class AuthController {
  async login (req, res, next) {
    try {
      const { user_name, password } = req.body;
      const message = await authService.loginService(user_name, password);
      next({ message });
    } catch (err) {
      next({ message: err.message });
    }
  }
}

export const authController = new AuthController();
