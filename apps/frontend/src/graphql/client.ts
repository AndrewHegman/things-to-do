import { ApolloCache, ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import {
  Category,
  CreateCategoryMutation,
  CreateThingMutation,
  GetCategoriesDocument,
  GetThingsDocument,
  Thing,
  typeDefs,
  UpdateCategoryMutation,
  UpdateThingMutation,
} from "@ttd/graphql";
import dotenv from "dotenv";

export const client = new ApolloClient({
  uri: `${import.meta.env.VITE_BACKEND_ENDPOINT}/graphql`,
  connectToDevTools: true,
  typeDefs,
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: `${import.meta.env.VITE_BACKEND_ENDPOINT}/graphql`,
  }),
});

export const updateCategoryCache = (
  store: ApolloCache<any>,
  { data }: { data?: UpdateCategoryMutation | CreateCategoryMutation | null }
) => {
  if (data) {
    const oldCategories = store.readQuery<{ categories: Category[] }>({ query: GetCategoriesDocument })?.categories || [];

    let updatedData;
    if ("updateCategory" in data) {
      updatedData = data.updateCategory;
    } else {
      updatedData = data.createCategory;
    }

    store.writeQuery({
      query: GetCategoriesDocument,
      data: { categories: [...oldCategories, updatedData] },
    });
  }
};

export const updateThingCache = (
  store: ApolloCache<any>,
  { data }: { data?: UpdateThingMutation | CreateThingMutation | null }
) => {
  if (data) {
    const oldThings = store.readQuery<{ things: Thing[] }>({ query: GetThingsDocument })?.things || [];

    let updatedData;
    if ("updateThing" in data) {
      updatedData = data.updateThing;
    } else {
      updatedData = data.createThing;
    }

    store.writeQuery({
      query: GetThingsDocument,
      data: { things: [...oldThings, updatedData] },
    });
  }
};
