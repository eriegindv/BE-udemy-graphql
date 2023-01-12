import { Post, Prisma, PrismaClient } from "@prisma/client";

interface Context {
  prisma: PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
  >;
}

interface PostCreateArgs {
  title: string;
  content: string;
}

interface PostPayloadType {
  userErrors: Array<{ message: string }>;
  post: null | Post;
}

export { Context, PostCreateArgs, PostPayloadType };
