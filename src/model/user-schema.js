import mongoose from 'mongoose';
import mongoose_delete from 'mongoose-delete';

const Schema = mongoose.Schema;

const user = new Schema(
  {
    first_name: {},
    last_name: {},
    user_name: {},
    email: {},
    password: {}
  },
  { timestamps: true }
);

user.plugin(mongoose_delete, { deletedAt: true });
export const User = mongoose.model('User', user);
