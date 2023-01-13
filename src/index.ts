import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { PrismaClient } from "@prisma/client";
import { Mutation, Post, Profile, Query, User } from "./resolvers";
import { typeDefs } from "./schema";
import { getUserFromToken } from "./utils";

const prisma = new PrismaClient();

const server = new ApolloServer({
  typeDefs,
  resolvers: { Query, Mutation, Profile, Post, User },
});

const start = async () => {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({ req }) => {
      let userInfo = null;
      if (req.headers.authorization) {
        userInfo = getUserFromToken(req.headers.authorization);
      }

      return { prisma, userInfo };
    },
  });

  console.log(`🚀  Server ready at: ${url}`);
};

start();
