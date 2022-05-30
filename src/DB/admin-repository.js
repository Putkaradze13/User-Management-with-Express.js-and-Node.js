import { Admin } from '../model/admin-schema.js';
import { hashing } from '../secure/hash.js';

class AdminRepository {
  findAdminByEmail(email) {
    return Admin.findOne({ email });
  }

  async findAdminById(_id) {
    return await Admin.findOne({ _id });
  }

  async createAdmin(data) {
    const { hashedPassword } = await hashing(data.password);

    return await Admin.create({
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      password: hashedPassword
    });
  }

  async deleteAdminById(_id) {
    return Admin.delete({ _id });
  }

  async resetPassword(_id, password) {
    const { hashedPassword } = await hashing(password);

    return Admin.updateOne({ _id }, { $set: { password: hashedPassword } }, { new: true });
  }
}

export const adminRepository = new AdminRepository();
