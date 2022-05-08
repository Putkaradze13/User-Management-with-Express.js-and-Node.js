import { User } from '../model/user-schema.js';
import { hashing } from '../secure/hash.js';

class UserRepository {
  findUser (user_name) {
    return User.findOne({ user_name, deleted: false });
  }

  findUserByEmail (email) {
    return User.findOne({ email, deleted: false });
  }

  async createUser (data) {
    const { hashedPassword } = await hashing(data.password);
    return await User.create({
      first_name: data.first_name,
      last_name: data.last_name,
      user_name: data.user_name,
      email: data.email,
      password: hashedPassword
    });
  }

  async updateUser (data) {
    const { hashedPass } = await hashing(data.password);

    return User.findOneAndUpdate(
      { user_name: data.user_name },
      {
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        password: hashedPass
      }
    );
  }

  async findAllUsers (filter = {}, page = 1, limit = 10) {
    return User.find()
      .select(['first_name', 'last_name', 'user_name', '-_id'])
      .skip(skip)
      .limit(limit);
  }

  async findOneUser (user_name) {
    return User.findOne({ user_name }).select([
      'first_name',
      'last_name',
      'createdAt',
      'updatedAt',
      '-_id'
    ]);
  }

  async deleteUser (user_name) {
    return User.delete({ user_name });
  }
}

export const userRepository = new UserRepository();
