import { Movies, Restaurants } from "@ttd/mock-data";

export const resolvers = {
  Query: {
    categories: () => [Restaurants, Movies],
  },
};
