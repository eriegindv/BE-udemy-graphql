import { Context, ProfileParentType } from "~/interfaces";

export default {
  user: async (parent: ProfileParentType, __: any, { prisma }: Context) => {
    console.log(parent);
    return prisma.user.findUnique({
      where: {
        id: parent.userId,
      },
    });
  },
};
