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

const yoga = createYoga({ schema, context: createContext() });

const server = createServer(yoga);

server.listen(3001, () => {
  console.info("Server is running on http://localhost:3001/api/graphql");
});
