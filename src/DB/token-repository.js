import { Token } from '../model/token-schema.js';

export class TokenRepository {
  findUserById (userId) {
    return Token.findOne({ userId });
  }

  deleteTokenByUserId (userId) {
    return Token.deleteOne({
      userId
    });
  }

  createToken (userId, hashedToken) {
    return Token.create({
      userId,
      token: hashedToken,
      createdAt: Date.now()
    });
  }
}
