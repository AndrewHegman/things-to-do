import { Category } from "@ttd/interfaces";
import { Things, Categories, Tags } from "./database";

export const resolvers = {
  Query: {
    categories: async () => await Categories.getAll(),
    category: async (_: any, args: any) => await Categories.getById(args.categoryId),
    tagsByCategory: async (_: any, args: any) => await Tags.getByCategoryId(args.categoryId),
    tags: async () => await Tags.getAll(),
    things: async () => await Things.getAll(),
  },
  Mutation: {
    createTag: async (_: any, args: any) => await Tags.create(args),
    createThing: async (_: any, args: any) => await Things.create(args),
    createCategory: async (_: any, args: any): Promise<Category> => await Categories.create(args),
    updateThing: async (_: any, args: any) => {
      const { id, ...updatedThing } = args;
      const res = await Things.update(id, updatedThing);
      return res;
    },
  },
};
