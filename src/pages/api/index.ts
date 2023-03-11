import { createServer } from "node:http";
import { createYoga } from "graphql-yoga";
import { schema } from "./schema";
import type { PrismaClient } from "@prisma/client";

import { prisma } from "../../../lib/prisma";

export type GraphQLContext = {
  prisma: PrismaClient;
};

export const createContext = async (): Promise<GraphQLContext> => {
  return {
    prisma,
  };
};

// Create a Yoga instance with a GraphQL schema.
const yoga = createYoga({ schema, context: createContext() });

// Pass it into a server to hook into request handlers.
const server = createServer(yoga);

// Start the server and you're done!
server.listen(3000, () => {
  console.info("Server is running on http://localhost:3000/graphql");
});
