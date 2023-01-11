import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

export const typeDefs = `#graphql
  type Query {
    cars: [Car!]!
  }

  type Car {
    id: ID!
    color: String!
    make: String!
  }

  type ManualGroup {
    id: ID!
    name: String!
    imageId: ID!
    bodyHtml: String!
    memberships: [GroupMembership!]!
  }

  type AutomaticGroup {
    id: ID!
    name: String!
    imageId: ID!
    bodyHtml: String!
    memberships: [GroupMembership!]!
    feature: [AutomaticGroupFeatures!]!
    # Whether we combine the features together or not
    # For example: color black + electric car
    applyFeaturesSeperately: Boolean!
  }

  type AutomaticGroupFeatures {
    column: String!
  }

  type GroupMembership {
    groupId: ID!
    carId: ID!
  }
`;

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query: {
      cars: () => [{ id: 1, color: "blue", make: "Toyota" }],
    },
  },
});

const { url } = await startStandaloneServer(server);
console.log(`🚀 Server ready at ${url}`);
