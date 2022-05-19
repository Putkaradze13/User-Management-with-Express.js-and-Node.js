import { adminRepository } from '../DB/admin-repository.js';

class AdminService {
  async createAdminService(data) {
    const adminExists = await adminRepository.findAdminByEmail(data.email);

    if (adminExists) {
      throw new Error(`Admin with given email already exists.`);
    }

    return await adminRepository.createAdmin({
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      password: data.password
    });
  }
}
export const adminService = new AdminService();
