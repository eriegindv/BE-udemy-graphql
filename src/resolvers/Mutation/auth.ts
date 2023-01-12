import { Context, SignUpArgs } from "~/interfaces";

export default {
  signup: async (
    _: any,
    { email, bio, name, password }: SignUpArgs,
    { prisma }: Context
  ) => {
    return prisma.user.create({
      data: { email, name, password, updatedAt: new Date() },
    });
  },
};
