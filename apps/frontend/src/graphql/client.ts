import { ApolloClient, InMemoryCache, makeVar, ReactiveVar } from "@apollo/client";
import { Thing, typeDefs } from "@ttd/graphql";
import dotenv from "dotenv";

export const client = new ApolloClient({
  uri: import.meta.env.VITE_BACKEND_ENDPOINT,
  connectToDevTools: true,
  typeDefs,
  cache: new InMemoryCache(),
});
