import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import validator from "validator";
import { Context, SignUpArgs, UserPayload } from "~/interfaces";
import { JWT_SECRET } from "~/keys";

const ONE_HOUR = 60 * 60 * 1000;

export default {
  signup: async (
    _: any,
    { email, bio, name, password }: SignUpArgs,
    { prisma }: Context
  ): Promise<UserPayload> => {
    const isEmail = validator.isEmail(email);
    const isValidPassword = validator.isLength(password, { min: 6 });

    if (!isEmail)
      return { userErrors: [{ message: "Invalid email" }], token: null };
    if (!isValidPassword)
      return { userErrors: [{ message: "Invalid password" }], token: null };
    if (!name || !bio)
      return { userErrors: [{ message: "Invalid name or bio" }], token: null };

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { email, name, password: hashedPassword, updatedAt: new Date() },
    });
    const token = jwt.sign({ userId: user.id, email }, JWT_SECRET, {
      expiresIn: ONE_HOUR,
    });

    return {
      userErrors: [],
      token,
    };
  },
};
