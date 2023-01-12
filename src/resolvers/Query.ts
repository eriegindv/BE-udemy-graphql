import { Context } from "~/interfaces";

export default {
  posts: async (_: any, __: any, { prisma }: Context) => {
    return prisma.post.findMany({
      orderBy: [{ createdAt: "desc" }],
    });
  },
};
