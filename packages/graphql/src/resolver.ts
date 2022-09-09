import { Movies, Restaurants } from "@ttd/mock-data";

export const resolvers = {
  Query: {
    categories: () => {
      console.log([Restaurants, Movies]);
      return [Restaurants, Movies];
    },
    category: (_: any, args: any) => [Restaurants, Movies].find((category) => category.id === args.categoryId),
  },
};
