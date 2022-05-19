import { Admin } from '../model/admin-schema.js';
import { hashing } from '../secure/hash.js';

class AdminRepository {
  findAdminByEmail(email) {
    return Admin.findOne({ email });
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
}
export const adminRepository = new AdminRepository();

