import { Tag } from "@ttd/interfaces";
import { mockDatabase } from "@ttd/mock-data";
import { Things, Categories, Tags } from "@ttd/database";

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
    tags: async () => {
      const res = await Tags.getInstance().getAll();
      console.log(res?.map((r) => r.category));
      return res;
    },
    things: async () => {
      const res = await Things.getInstance().getAll();
      // console.log(res?.map((r) => r.tags));
      console.log(res[0]);

      return res;
    },
  },
  Mutation: {
    createTag: async (_: any, args: any) => await Tags.getInstance().create(args),
    createThing: async (_: any, args: any) => {
      const res = await Things.getInstance().create(args);
      console.log(res);
      return res;
    },
  },
};
