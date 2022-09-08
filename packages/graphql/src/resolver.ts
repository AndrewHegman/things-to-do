import { Movies, Restaurants } from "@ttd/mock-data";

export const resolvers = {
  Query: {
    categories: () => [Restaurants, Movies],
    category: (_: any, args: any) =>
      [Restaurants, Movies].find((category) => {
        return category.id === args.categoryId;
      }),
  },
};
