import { Categories } from "../../database";

export const createCategory = async (_: any, args: any) => await Categories.create(args);

export const updateCategory = async (_: any, args: any) => {
  const { id, ...updatedCategory } = args;
  return await Categories.update(id, updatedCategory);
};
