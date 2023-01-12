import { Context, PostArgs, PostPayload } from "~/interfaces";

export default {
  postCreate: async (
    _: any,
    { post }: PostArgs,
    { prisma }: Context
  ): Promise<PostPayload> => {
    const { title, content } = post;
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

    const newPost = await prisma.post.create({
      data: {
        title,
        content,
        authorId: 1,
        updatedAt: new Date(),
      },
    });

    return {
      userErrors: [],
      post: newPost,
    };
  },

  postUpdate: async (
    _: any,
    { postId, post }: { postId: string; post: PostArgs["post"] },
    { prisma }: Context
  ): Promise<PostPayload> => {
    const { title, content } = post;

    if (!title && !content) {
      return {
        userErrors: [{ message: "Need to have at least on field to update" }],
        post: null,
      };
    }

    const existingPost = await prisma.post.findUnique({
      where: { id: Number(postId) },
    });
    if (!existingPost) {
      return {
        userErrors: [{ message: "Post does not exist" }],
        post: null,
      };
    }

    let payloadToUpdate = { title, content };
    if (!title) delete payloadToUpdate.title;
    if (!content) delete payloadToUpdate.content;

    const updatedPost = await prisma.post.update({
      data: { ...payloadToUpdate },
      where: { id: Number(postId) },
    });

    return {
      userErrors: [],
      post: updatedPost,
    };
  },

  postDelete: async (
    _: any,
    { postId }: { postId: string },
    { prisma }: Context
  ): Promise<PostPayload> => {
    const existingPost = await prisma.post.findUnique({
      where: {
        id: Number(postId),
      },
    });

    if (!existingPost) {
      return {
        userErrors: [{ message: "Post does not exist" }],
        post: null,
      };
    }

    await prisma.post.delete({
      where: {
        id: Number(postId),
      },
    });

    return {
      userErrors: [],
      post: existingPost,
    };
  },
};
