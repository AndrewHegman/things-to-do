import { ApolloClient, InMemoryCache } from "@apollo/client";
import dotenv from "dotenv";

export const client = new ApolloClient({
  uri: import.meta.env.VITE_BACKEND_ENDPOINT,
  cache: new InMemoryCache(),
});
