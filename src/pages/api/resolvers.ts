import { Resolvers } from "../../../types";

export const resolvers: Resolvers = {
  Query: {
    cart: (_, { id }, { prisma }) => {
      return {
        id,
        totalItems: 0,
      };
    },
  },
};
