import { Resolvers } from "@ttd/graphql";

export const tags: Resolvers["Query"] = {
  tags: async (parent, args, { Tags }) => await Tags.getAll(),
  tagsByCategory: async (parent, args, { Tags }) => await Tags.getByCategoryId(args.categoryId),
};
