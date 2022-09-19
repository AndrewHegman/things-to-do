import { Tag } from "@ttd/interfaces";
import { mockDatabase } from "@ttd/mock-data";
import { Things, Categories } from "@ttd/database";

export const resolvers = {
  Query: {
    categories: async () => await Categories.getInstance().getAll(),
    category: async (_: any, args: any) => await Categories.getInstance().getById(args.categoryId),
  },
  Mutation: {
    createTag: (_: any, args: any) => mockDatabase.createTag(args),
  },
};
