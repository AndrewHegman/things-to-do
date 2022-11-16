import { Categories } from "../../database";

export const categories = async () => await Categories.getAll();
export const category = async (_: any, args: any) => await Categories.getById(args.categoryId);
