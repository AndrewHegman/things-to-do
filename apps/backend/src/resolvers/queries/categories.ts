import { Resolvers } from "@ttd/graphql";
import { Context } from "../../database/interfaces";

export const categories: Resolvers<Context>["Query"] = {
  categories: async (parent, args, { Categories }) => await Categories.getAll(args.dev),
  // TODO: Get rid of the non-null assertion
  category: async (parent, args, { Categories }) => (await Categories.getById(args.categoryId))!,
};
