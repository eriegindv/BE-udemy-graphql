import { Post, Prisma, PrismaClient } from "@prisma/client";

interface Context {
  prisma: PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
  >;
  userInfo: { userId: number } | null;
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
  credentials: {
    email: string;
    password: string;
  };
  name: string;
  bio: string;
}

interface UserPayload {
  userErrors: Array<{ message: string }>;
  token: string | null;
}

interface ProfileParentType {
  id: number;
  bio: string;
  userId: number;
}

export {
  Context,
  PostArgs,
  PostPayload,
  SignUpArgs,
  UserPayload,
  ProfileParentType,
};
