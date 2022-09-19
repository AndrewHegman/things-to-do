import { Tag } from "@ttd/interfaces";
import { mockDatabase } from "@ttd/mock-data";
import { Things, Categories, Tags } from "@ttd/database";

const replaceIdField = (data: { _id: string; [key: string]: any }) => {
  const { _id, ...rest } = data;
  return { ...rest, id: _id };
};

export const resolvers = {
  Query: {
    categories: async () => {
      const res = await Categories.getInstance().getAll();
      console.log(res);
      return res;
    },
    category: async (_: any, args: any) => await Categories.getInstance().getById(args.categoryId),
    tagsByCategory: async (_: any, args: any) => {
      const res = await Tags.getInstance().getByCategoryId(args.categoryId);
      console.log(res);
      return res;
    },
    tags: async () => await Tags.getInstance().getAll(),
  },
  Mutation: {
    createTag: async (_: any, args: any) => {
      const res = await Tags.getInstance().create(args);
      console.log(res);
      return res;
    },
  },
};
