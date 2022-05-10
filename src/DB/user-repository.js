import { User as userSchema } from '../model/user-schema.js';
import { hashing } from '../secure/hash.js';

class UserRepository {
  async findUser(user_name) {
    return await userSchema.findOne({ user_name, deleted: false });
  }

  async findUserById(_id) {
    return await userSchema.findOne({ _id, deleted: false });
  }

  async createUser(data) {
    const { hashedPassword } = await hashing(data.password);
    return await userSchema.create({
      first_name: data.first_name,
      last_name: data.last_name,
      user_name: data.user_name,
      email: data.email,
      password: hashedPassword
    });
  }

  async updateUser(data) {
    console.log(data);
    const { hashedPass } = await hashing(data.password);

    return userSchema.findOneAndUpdate({ id }, data);
  }

  async findAllUsers(filter, skip, limit) {
    return userSchema.find(filter).skip(skip).limit(limit);
  }

  async findOneUser(filter) {
    return userSchema.findOne(filter);
  }

  async deleteUserById(id) {
    return userSchema.delete({ id });
  }
}

export const userRepository = new UserRepository();
