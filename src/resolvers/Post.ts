import { Context, PostParentType } from "~/interfaces";

export default {
  user: async (parent: PostParentType, __: any, { prisma }: Context) => {
    return prisma.user.findUnique({
      where: {
        id: parent.authorId,
      },
    });
  },
};
