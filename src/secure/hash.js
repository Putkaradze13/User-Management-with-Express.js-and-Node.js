import bcrypt from 'bcrypt';

export const hashing = async (pass, salt) => {
  salt = salt || (await bcrypt.genSalt(10));
  const hashedPass = await bcrypt.hash(pass, salt);
  return { hashedPass, salt };
};
