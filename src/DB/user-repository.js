import { User as userSchema } from '../model/user-schema.js';
import { hashing } from '../secure/hash.js';

class UserRepository {
  async findUser(user_name) {
    return await userSchema.findOne({ user_name, deleted: false });
  }

  async createUser(data) {
    const { hashedPass } = await hashing(data.password);
    return await userSchema.create({
      first_name: data.first_name,
      last_name: data.last_name,
      user_name: data.user_name,
      email: data.email,
      role: data.role,
      password: hashedPass
    });
  }

  async updateUser(data) {
    const { hashedPass } = await hashing(data.password);

    return userSchema.findOneAndUpdate(
      { user_name: data.user_name },
      {
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        password: hashedPass
      }
    );
  }

  async findAllUsers(page = 0, limit = 10) {
    return userSchema
      .find()
      .select(['first_name', 'last_name', 'user_name', '-_id'])
      .skip(page)
      .limit(limit);
  }

  async findOneUser(user_name) {
    return userSchema
      .findOne({ user_name })
      .select(['first_name', 'last_name', 'createdAt', 'updatedAt', '-_id']);
  }

  async deleteUser(user_name) {
    return userSchema.delete({ user_name });
  }
}

export const userRepository = new UserRepository();
