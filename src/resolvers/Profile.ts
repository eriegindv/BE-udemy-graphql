import { Context, ProfileParentType } from "~/interfaces";

export default {
  user: async (parent: ProfileParentType, __: any, { prisma }: Context) => {
    return prisma.user.findUnique({
      where: {
        id: parent.userId,
      },
    });
  },
};
