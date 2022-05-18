import { Token } from '../model/token-schema.js';
import crypto from 'crypto';

export class TokenRepository {
  findTokenByUserId(userId) {
    return Token.findOne({ userId });
  }

  findUserToken(_id, token) {
    return Token.findOne({ userId: _id, token: token });
  }

  deleteTokenByUserId(_id) {
    return Token.deleteOne({
      userId: _id
    });
  }

  createToken(_id) {
    return Token.create({
      userId: _id,
      token: crypto.randomBytes(32).toString('hex'),
      createdAt: Date.now()
    });
  }
}
