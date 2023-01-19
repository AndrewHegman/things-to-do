import { Resolvers } from "@ttd/graphql";

export const categories: Resolvers["Query"] = {
  categories: async (parent, args, { Categories }) => await Categories.getAll(),
  // TODO: Get rid of the non-null assertion
  category: async (parent, args, { Categories }) => (await Categories.getById(args.categoryId))!,
};
