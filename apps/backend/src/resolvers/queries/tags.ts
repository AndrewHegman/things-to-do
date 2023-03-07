import { Resolvers } from "@ttd/graphql";
import { Context } from "../../database/interfaces";

export const tags: Resolvers<Context>["Query"] = {
  tags: async (parent, args, { Tags }) => await Tags.getAll(args.dev),
  tagsByCategory: async (parent, args, { Tags }) => await Tags.getByCategoryId(args.categoryId),
};
