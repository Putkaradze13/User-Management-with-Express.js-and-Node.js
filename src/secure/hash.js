import bcrypt from 'bcrypt';

export const hashing = async (password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return { hashedPassword };
};

export const comparePasswords = async (password, userPassword) => {
  const comparison = await bcrypt.compare(password, userPassword);
  return { comparison };
};
