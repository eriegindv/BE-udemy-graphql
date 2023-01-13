import { Context, UserParentType } from "~/interfaces";

export default {
  posts: async (
    parent: UserParentType,
    __: any,
    { prisma, userInfo }: Context
  ) => {
    const isOwnProfile = parent.id === userInfo?.userId;

    if (isOwnProfile)
      return prisma.post.findMany({
        where: {
          authorId: parent.id,
        },
        orderBy: [
          {
            createdAt: "desc",
          },
        ],
      });

    return prisma.post.findMany({
      where: {
        authorId: parent.id,
        published: true,
      },
      orderBy: [
        {
          createdAt: "desc",
        },
      ],
    });
  },
};
