import bcrypt from "bcryptjs";
import validator from "validator";
import { Context, SignUpArgs, UserPayload } from "~/interfaces";

export default {
  signup: async (
    _: any,
    { email, bio, name, password }: SignUpArgs,
    { prisma }: Context
  ): Promise<UserPayload> => {
    const isEmail = validator.isEmail(email);
    const isValidPassword = validator.isLength(password, { min: 6 });

    if (!isEmail)
      return { userErrors: [{ message: "Invalid email" }], user: null };
    if (!isValidPassword)
      return { userErrors: [{ message: "Invalid password" }], user: null };
    if (!name || !bio)
      return { userErrors: [{ message: "Invalid name or bio" }], user: null };

    const hashedPassword = await bcrypt.hash(password, 10);

    const createdUser = await prisma.user.create({
      data: { email, name, password: hashedPassword, updatedAt: new Date() },
    });

    return {
      userErrors: [],
      // user: createdUser,
      user: null,
    };
  },
};
