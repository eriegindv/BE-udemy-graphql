import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import validator from "validator";
import { Context, SignUpArgs, UserPayload } from "~/interfaces";
import { JWT_SECRET } from "~/keys";

const ONE_HOUR = 60 * 60 * 1000;

export default {
  signup: async (
    _: any,
    { credentials: { email, password }, bio, name }: SignUpArgs,
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
    await prisma.profile.create({
      data: { userId: user.id, bio, updatedAt: new Date() },
    });

    const token = jwt.sign({ userId: user.id, email }, JWT_SECRET, {
      expiresIn: ONE_HOUR,
    });

    return {
      userErrors: [],
      token,
    };
  },

  signin: async (
    _: any,
    { credentials: { email, password } }: SignUpArgs,
    { prisma }: Context
  ): Promise<UserPayload> => {
    if (!email || !password)
      return {
        userErrors: [{ message: "Email and password are required" }],
        token: null,
      };
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user)
      return {
        userErrors: [{ message: "Invalid credentials" }],
        token: null,
      };

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return {
        userErrors: [{ message: "Invalid credentials" }],
        token: null,
      };

    const token = jwt.sign({ email: user.email, userId: user.id }, JWT_SECRET, {
      expiresIn: ONE_HOUR,
    });

    return { userErrors: [], token };
  },
};
