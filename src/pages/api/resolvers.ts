import { findOrCreateCart } from "./../../../lib/cart";
import { Resolvers } from "../../../types";
import currencyFormatter from "currency-formatter";

const currencyCode = "USD";

export const resolvers: Resolvers = {
  Query: {
    cart: async (_, { id }, { prisma }) => {
      return await findOrCreateCart(prisma, id);
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
  CartItem: {
    unitTotal: (item) => {
      const amount = item.price;

      return {
        amount,
        formatted: currencyFormatter.format(amount / 100, {
          code: currencyCode,
        }),
      };
    },
    lineTotal: (item) => {
      const amount = item.quantity * item.price;

      return {
        amount,
        formatted: currencyFormatter.format(amount / 100, {
          code: currencyCode,
        }),
      };
    },
  },
  Mutation: {
    addItem: async (_, { input }, { prisma }) => {
      const cart = await findOrCreateCart(prisma, input.cartId);

      await prisma.cartItem.upsert({
        create: {
          cartId: cart.id,
          id: input.id,
          name: input.name,
          price: input.price,
          description: input.description,
          image: input.image,
          quantity: input.quantity || 1,
        },
        update: {
          quantity: {
            increment: input.quantity || 1,
          },
        },
        where: {
          id_cartId: {
            cartId: cart.id,
            id: input.id,
          },
        },
      });

      return cart;
    },
    removeItem: async (_, { input }, { prisma }) => {
      const { cartId } = await prisma.cartItem.delete({
        where: {
          id_cartId: {
            id: input.id,
            cartId: input.cartId,
          },
        },
        select: {
          cartId: true,
        },
      });

      return findOrCreateCart(prisma, cartId);
    },
    increaseCartItem: async (_, { input }, { prisma }) => {
      const { cartId } = await prisma.cartItem.update({
        data: {
          quantity: {
            increment: 1,
          },
        },
        where: {
          id_cartId: {
            id: input.id,
            cartId: input.cartId,
          },
        },
        select: {
          cartId: true,
        },
      });

      return findOrCreateCart(prisma, cartId);
    },
  },
};
