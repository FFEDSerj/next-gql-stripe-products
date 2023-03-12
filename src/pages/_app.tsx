import "tailwindcss/tailwind.css";
import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import { useClient } from "../../lib/client";
import { Header } from "../../components/Header";

export default function App({ Component, pageProps }: AppProps) {
  const client = useClient();
  return (
    <ApolloProvider client={client}>
      <Header />
      <Component {...pageProps} />
    </ApolloProvider>
  );
}
