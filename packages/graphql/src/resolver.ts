import { Tag } from "@ttd/interfaces";
import { mockDatabase } from "@ttd/mock-data";
import { Things, Categories, Tags } from "@ttd/database";

export const resolvers = {
  Query: {
    categories: async () => await Categories.getInstance().getAll(),
    category: async (_: any, args: any) => await Categories.getInstance().getById(args.categoryId),
    tagsByCategory: async (_: any, args: any) => {
      const res = await Tags.getInstance().getByCategoryId(args.categoryId);
      console.log(res);
      return res;
    },
  },
  Mutation: {
    createTag: async (_: any, args: any) => {
      const res = await Tags.getInstance().create(args);
      console.log(res);
      return res;
    },
  },
};
