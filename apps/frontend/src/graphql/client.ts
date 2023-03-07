import { ApolloCache, ApolloClient, InMemoryCache } from "@apollo/client";
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

export const client = new ApolloClient({
  uri: import.meta.env.VITE_BACKEND_ENDPOINT,
  // connectToDevTools: true,
  typeDefs,
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      variables: {
        dev: import.meta.env.VITE_DEV === "true",
      },
    },
    query: {
      variables: {
        dev: import.meta.env.VITE_DEV === "true",
      },
    },
    mutate: {
      variables: {
        dev: import.meta.env.VITE_DEV === "true",
      },
    },
  },
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
