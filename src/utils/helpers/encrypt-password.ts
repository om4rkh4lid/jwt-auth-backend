import bcrypt from "bcrypt";

export const encryptPassword = async (password: string): Promise<string> => {
  const saltRounds = parseInt(process.env.SALT_ROUNDS ?? '12');
  return await bcrypt.hash(password, saltRounds);
}