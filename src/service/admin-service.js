import { adminRepository } from '../DB/admin-repository.js';
import { Admin } from '../model/admin-schema.js';

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

  async deleteService(userId, userData) {
    const activeAdmins = await Admin.find({ deleted: false });
    if (activeAdmins.length < 2) throw new Error(`Last admin can't be deleted!`);

    const user = await adminRepository.findAdminById(userId);

    if (userData.type !== 'admin') throw new Error('Not allowed');

    if (user.deleted === true) throw new Error(`Admin is already deleted!`);

    await adminRepository.deleteAdminById(userId);
    return await adminRepository.findAdminById(userId);
  }
}

export const adminService = new AdminService();
