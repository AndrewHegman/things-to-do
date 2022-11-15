import { Things } from "../../database";

export const things = async () => await Things.getAll();

export const thingsByCategory = async (_: any, args: any) => {
  return await Things.getAll(args.categoryId);
};

export const thingsByCategories = async (_: any, args: any) => {
  return (await Promise.all(args.categoryIds.map(async (categoryId: string) => await Things.getAll(categoryId)))).flatMap(
    (thing) => thing
  );
};
