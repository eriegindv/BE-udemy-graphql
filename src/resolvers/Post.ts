import { Context, PostParentType } from "~/interfaces";
import userLoader from "~/loaders/userLoader";

export default {
  user: async (parent: PostParentType, __: any, { prisma }: Context) => {
    return userLoader.load(parent.authorId);
  },
};
