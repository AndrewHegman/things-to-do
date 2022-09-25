import { Things, Categories, Tags } from "@ttd/database";

export const resolvers = {
  Query: {
    categories: async () => await Categories.getInstance().getAll(),
    category: async (_: any, args: any) => await Categories.getInstance().getById(args.categoryId),
    tagsByCategory: async (_: any, args: any) => await Tags.getInstance().getByCategoryId(args.categoryId),
    tags: async () => await Tags.getInstance().getAll(),
    things: async () => await Things.getInstance().getAll(),
  },
  Mutation: {
    createTag: async (_: any, args: any) => await Tags.getInstance().create(args),
    createThing: async (_: any, args: any) => await Things.getInstance().create(args),
    createCategory: async (_: any, args: any) => await Categories.getInstance().create(args),
    updateThing: async (_: any, args: any) => {
      const { id, ...updatedThing } = args;
      const res = await Things.getInstance().update(id, updatedThing);
      return res;
    },
  },
};
