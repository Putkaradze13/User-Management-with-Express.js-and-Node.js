import mongoose from 'mongoose';
import mongoose_delete from 'mongoose-delete';

const Schema = mongoose.Schema;

const admin = new Schema(
  {
    first_name: {},
    last_name: {},
    email: {},
    password: {}
  },
  { timestamps: true }
);

admin.plugin(mongoose_delete, { deletedAt: true });
export const Admin = mongoose.model('Admin', admin);
