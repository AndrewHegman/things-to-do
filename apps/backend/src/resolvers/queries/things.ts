import { Resolvers } from "@ttd/graphql";
import { Context } from "../../database/interfaces";

export const things: Resolvers<Context>["Query"] = {
  things: async (parent, args, { Things }) => await Things.getAll(args.dev),
  thingsByCategory: async (parent, args, { Things }) => await Things.getByCategory(args.categoryId),
  thingsByCategories: async (parent, args, { Things }) =>
    (await Promise.all(args.categoryIds.map(async (categoryId: string) => await Things.getByCategory(categoryId)))).flatMap(
      (thing) => thing
    ),
};
