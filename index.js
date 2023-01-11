import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

export const typeDefs = `#graphql
 type Query {
    hello: String!
    car(id: ID!): Car!
  }
  type Mutation {
    groupDelete(collectionId: ID!)
    groupPublish(collectionId: ID!)
    groupUnpublish(collectionId: ID!)
    groupAddProducts(collectionId: ID!, productId: ID!)
    groupRemoveProducts(collectionId: ID!, productId: ID!)
    groupCreate(
      groupInput: GroupInput!
    )
    groupUpdate(
      groupId: ID!
      groupInput: GroupInput!
    ): GroupUpdatePayload
  }

  type GroupUpdatePayload {
    group: Group
    userErrors: [UserErrors]!
  }

  type UserErrors {
    message: String!
    field: [String!]!
  }

  input GroupInput {
    name: String
    image: ImageInput
    description: String
    featureSet: GroupFeatureFields
  }

  input ImageInput {
    url: String!
  }

  type Car {
    id: ID!
    color: String!
    make: String!
  }

  type Group {
    id: ID!
    featureSet: GroupFeatureSet!
    hasCar(id: ID!): Boolean!
    cars(skip: Int!, take: Int!): [Car!]!
    name: String!
    image: Image!
    description: String!
  }

  type Image {
    id: ID!
    url: String!
  }

  type GroupFeatureSet {
    features: [GroupFeatures!]!
    applyFeaturesSeparately: Boolean!
  }

  type GroupFeature {
    feature: GroupFeatureFields!
  }
  
  enum GroupFeatureFields {
    INCLINE_ENGINE
    FOUR_CYLINDER_ENGINE
    TWIN_CYLUNDER_ENGINE
    RED_PAINT
    BLACK_PAINT
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
