import { adminRepository } from '../DB/admin-repository.js';
import { Admin } from '../model/admin-schema.js';
import { tokenRepository } from '../DB/token-repository.js';
import { sendEmail } from '../utils/send-mail.js';

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

  async forgotPasswordService(email) {
    const admin = await adminRepository.findAdminByEmail(email);
    if (!admin) throw new Error(`Admin with given email doesn't exist`);

    let token = await tokenRepository.findTokenByUserId(admin._id);
    if (token) {
      await tokenRepository.deleteTokenByUserId(admin._id);
    }
    token = await tokenRepository.createToken(admin._id);

    const link = `${process.env.BASE_URL}/admin/resetPassword/${admin._id}/${token.token}`;
    await sendEmail(admin.email, 'Reset password request', link);
    return link;
  }

  async resetPasswordService(adminId, token, password) {
    const admin = await adminRepository.findAdminById(adminId);
    if (!admin) throw new Error('Invalid link or expired!');
    const { _id } = admin;

    const tokenExists = await tokenRepository.findUserToken(_id, token);
    if (!tokenExists) throw new Error('Invalid link or expired');

    await adminRepository.resetPassword(adminId, password);

    await tokenRepository.deleteTokenByUserId(admin._id);
  }
}

export const adminService = new AdminService();
