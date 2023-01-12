import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { PrismaClient } from "@prisma/client";
import { Mutation, Query } from "./resolvers";
import { typeDefs } from "./schema";

const prisma = new PrismaClient();

const server = new ApolloServer({
  typeDefs,
  resolvers: { Query, Mutation },
});

const start = async () => {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async () => ({
      prisma,
    }),
  });

  console.log(`🚀  Server ready at: ${url}`);
};

start();
