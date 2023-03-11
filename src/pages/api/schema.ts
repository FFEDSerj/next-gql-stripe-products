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
      items: [CartItem!]!
      subTotal: Money!
    }

    type Money {
      formatted: String!
      amount: Int!
    }

    type CartItem {
      id: ID!
      name: String!
      description: String
      unitTotal: Money!
      lineTotal: Money!
      quantity: Int!
      image: String
    }
  `,
  resolvers,
});
