import { Category, Resolvers } from "@ttd/graphql";

export const categories: Resolvers["Mutation"] = {
  createCategory: async (parent, args, { Categories }) => await Categories.create(args.name),
  updateCategory: async (parent, args, { Categories }) => {
    const { id, ...updatedCategory } = args;
    // TODO: Get better types here
    return (await Categories.update(id, updatedCategory as Partial<Omit<Category, "_id">>))!;
  },
};
