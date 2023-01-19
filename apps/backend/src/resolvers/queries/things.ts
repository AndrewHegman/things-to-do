import { Resolvers } from "@ttd/graphql";

export const things: Resolvers["Query"] = {
  things: async (parent, args, { Things }) => await Things.getAll(),
  thingsByCategory: async (parent, args, { Things }) => await Things.getAll(args.categoryId),
  thingsByCategories: async (parent, args, { Things }) =>
    (await Promise.all(args.categoryIds.map(async (categoryId: string) => await Things.getAll(categoryId)))).flatMap(
      (thing) => thing
    ),
};
