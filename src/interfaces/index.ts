import { Post, Prisma, PrismaClient } from "@prisma/client";

interface Context {
  prisma: PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
  >;
}

interface PostArgs {
  post: {
    title?: string;
    content?: string;
  };
}

interface PostPayload {
  userErrors: Array<{ message: string }>;
  post: null | Post;
}

interface SignUpArgs {
  email: string;
  name: string;
  bio: string;
  password: string;
}

interface UserPayload {
  userErrors: Array<{ message: string }>;
  user: null;
}

export { Context, PostArgs, PostPayload, SignUpArgs, UserPayload };
