import { Context, PostCreateArgs, PostPayloadType } from "~/interfaces";

export default {
  postCreate: async (
    _: any,
    { title, content }: PostCreateArgs,
    { prisma }: Context
  ): Promise<PostPayloadType> => {
    if (!title || !content) {
      return {
        userErrors: [
          {
            message: "You must provide title and content to create a post",
          },
        ],
        post: null,
      };
    }

    const post = await prisma.post.create({
      data: {
        title,
        content,
        authorId: 1,
        updatedAt: new Date(),
      },
    });

    return {
      userErrors: [],
      post,
    };
  },
};
