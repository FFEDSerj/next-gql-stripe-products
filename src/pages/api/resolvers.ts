import { Resolvers } from "../../../types";
import currencyFormatter from "currency-formatter";

const currencyCode = "USD";

export const resolvers: Resolvers = {
  Query: {
    cart: async (_, { id }, { prisma }) => {
      let cart = await prisma.cart.findUnique({
        where: {
          id,
        },
      });

      if (!cart) {
        cart = await prisma.cart.create({
          data: {
            id,
          },
        });
      }

      return cart;
    },
  },
  Cart: {
    items: async ({ id }, __, { prisma }) => {
      const items = await prisma.cart
        .findUnique({
          where: {
            id,
          },
        })
        .items();

      return items ?? [];
    },
    totalItems: async ({ id }, __, { prisma }) => {
      const items =
        (await prisma.cart
          .findUnique({
            where: {
              id,
            },
          })
          .items()) ?? [];

      return items?.reduce((total, item) => total + item.quantity || 1, 0);
    },
    subTotal: async ({ id }, __, { prisma }) => {
      const items = await prisma.cart
        .findUnique({
          where: {
            id,
          },
        })
        .items();

      const amount =
        items?.reduce(
          (total, item) => total + item.price * item.quantity || 0,
          0
        ) ?? 0;

      return {
        formatted: currencyFormatter.format(amount / 100, {
          code: currencyCode,
        }),
        amount,
      };
    },
  },
};
