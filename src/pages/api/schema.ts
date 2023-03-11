import { createSchema } from "graphql-yoga";
import { resolvers } from "./resolvers";

export const schema = createSchema({
  typeDefs: /* GraphQL */ `
    type Query {
      cart(id: ID!): Cart
    }

    type Mutation {
      addItem(input: AddToCartInput!): Cart
      removeItem(input: RemoveFromCartInput!): Cart
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

    input AddToCartInput {
      cartId: ID!
      id: ID!
      name: String!
      description: String
      image: String
      price: Int!
      quantity: Int = 1
    }

    input RemoveFromCartInput {
      id: ID!
      cartId: ID!
    }
  `,
  resolvers,
});
