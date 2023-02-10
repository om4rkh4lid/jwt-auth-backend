import bcrypt from "bcrypt";

export const verifyPassword = async (input: string, actual: string): Promise<boolean> => {
  return await bcrypt.compare(input, actual);
}