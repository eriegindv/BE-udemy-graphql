import { Context, PostCreateArgs } from "~/interfaces";

export default {
  postCreate: async (
    parent: any,
    { title, content }: PostCreateArgs,
    { prisma }: Context
  ) => {
    prisma.post.create({
      data: {
        title,
        content,
        authorId: 1,
        updatedAt: Date.now().toLocaleString(),
      },
    });
  },
};
