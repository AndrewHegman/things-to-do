import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: "http://192.168.4.42:4000",
  cache: new InMemoryCache(),
});
