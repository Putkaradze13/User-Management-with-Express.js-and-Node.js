import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const token = new Schema({
  userId: {
    type: Object,
    required: true
  },
  token: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 3600
  }
});

export const Token = mongoose.model('Token', token);
