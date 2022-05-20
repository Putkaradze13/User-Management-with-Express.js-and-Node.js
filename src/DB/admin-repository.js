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
}

export const adminRepository = new AdminRepository();
