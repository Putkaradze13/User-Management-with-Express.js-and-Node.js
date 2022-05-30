import mongoose from 'mongoose';
import mongoose_delete from 'mongoose-delete';

const Schema = mongoose.Schema;

const user = new Schema(
  {
    first_name: { type: String },
    last_name: { type: String },
    user_name: { type: String },
    email: { type: String },
    password: { type: String }
  },
  { timestamps: true }
);

user.plugin(mongoose_delete, { deletedAt: true });
export const User = mongoose.model('User', user);
