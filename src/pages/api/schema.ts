import { createSchema } from "graphql-yoga";
import { resolvers } from "./resolvers";

export const schema = createSchema({
  typeDefs: /* GraphQL */ `
    type Query {
      cart(id: ID!): Cart
    }

    type Cart {
      id: ID!
      totalItems: Int!
    }
  `,
  resolvers,
});
