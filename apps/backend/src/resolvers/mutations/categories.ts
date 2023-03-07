import { Category, Resolvers } from "@ttd/graphql";
import { Context } from "../../database/interfaces";

export const categories: Resolvers<Context>["Mutation"] = {
  createCategory: async (parent, args, { Categories }) => await Categories.create(args.name, args.dev),
  updateCategory: async (parent, args, { Categories }) => {
    const { id, ...updatedCategory } = args;
    // TODO: Get better types here
    return (await Categories.update(id, updatedCategory as Partial<Omit<Category, "_id">>))!;
  },
};
