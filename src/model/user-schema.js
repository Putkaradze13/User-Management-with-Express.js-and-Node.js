import mongoose from 'mongoose';
import mongoose_delete from 'mongoose-delete';

const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
      minLength: [3, 'first_name is too short!'],
      maxLength: [24, 'first_name is too long!']
    },
    last_name: {
      type: String,
      required: true,
      minLength: [3, 'last_name is too short!'],
      maxLength: [24, 'last_name is too long!']
    },
    user_name: {
      type: String,
      required: true,
      unique: true,
      minLength: [3, 'user_name is too short!'],
      maxLength: [32, 'user_name is too long!']
    },
    role: {
      type: String,
      required: true,
      default: 'user'
    },
    password: {
      type: String,
      required: true
    },
    salt: {
      type: String
    }
  },
  { timestamps: true }
);

userSchema.plugin(mongoose_delete, { deletedAt: true });

export const User = mongoose.model('User', userSchema);
