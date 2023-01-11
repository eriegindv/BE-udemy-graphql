// The GraphQL schema
export const typeDefs = `#graphql
  type Query {
    hello: String
    products(filter: ProductsFilterInput): [Product!]!
    product(id: ID!): Product
    categories: [Category!]!
    category(id: ID!): Category
  }

  type Mutation {
    addCategory(input: AddCategoryInput!): Category!
    deleteCategory(id: ID!): Boolean!
    updateCategory(id: ID!, input: UpdateCategoryInput!): Category

    addProduct(input: AddProductInput!): Product!
    deleteProduct(id: ID!): Boolean!
    updateProduct(id: ID!, input: UpdateProductInput!): Product

    addReview(input: AddReviewInput!): Review!
    deleteReview(id: ID!): Boolean!
    updateReview(id: ID!, input: UpdateReviewInput!): Review
  }

  type Product {
    id: ID!
    name: String!
    description: String!
    quantity: Int!
    price: Float!
    image: String!
    onSale: Boolean!
    category: Category
    reviews: [Review!]!
  }

  type Category {
    id: ID!
    name: String!
    products(filter: ProductsFilterInput): [Product!]!
  }

  type Review {
    id: ID!
    date: String!
    title: String!
    comment: String!
    rating: Int!
  }

  input ProductsFilterInput {
    onSale: Boolean
    avgRating: Int
  }

  input AddCategoryInput {
    name: String!
  }

  input UpdateCategoryInput {
    name: String!
  }

  input AddProductInput {
    name: String!
    description: String!
    quantity: Int!
    price: Float!
    image: String!
    onSale: Boolean!
    categoryId: ID!
  }

  input UpdateProductInput {
    name: String
    description: String
    quantity: Int
    price: Float
    image: String
    onSale: Boolean
    categoryId: ID
  }

  input AddReviewInput {
    date: String!
    title: String!
    comment: String!
    rating: Int!
    productId: ID!
  }

  input UpdateReviewInput {
    date: String
    title: String
    comment: String
    rating: Int
    productId: ID
  }
`;
