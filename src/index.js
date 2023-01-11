import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { db } from "./db.js";
import { Category, Mutation, Product, Query } from "./resolvers/index.js";
import { typeDefs } from "./schema.js";

const server = new ApolloServer({
  typeDefs,
  resolvers: { Query, Category, Product, Mutation },
});

const { url } = await startStandaloneServer(server, {
  // Your async context function should async and
  // return an object
  context: async ({ req, res }) => ({
    db,
  }),
});
console.log(`🚀 Server ready at ${url}`);
