import { useMemo } from "react";
import { ApolloClient, InMemoryCache } from "@apollo/client";

const protocol = `${
  process.env.NODE_ENV === "development" ? "http" : "https"
}://`;

const host =
  typeof window === "undefined"
    ? process.env.NEXT_PUBLIC_VERCEL_URL || "localhost:3000"
    : window.location.host;

export const origin = `${protocol}${host}`;

export const useClient = () => {
  const client = useMemo(
    () =>
      new ApolloClient({
        uri: `http://localhost:3001/api/graphql`, // TODO figure out how to stick to the same port.
        // uri: `${origin}/graphql`,
        cache: new InMemoryCache(),
      }),
    []
  );
  return client;
};
