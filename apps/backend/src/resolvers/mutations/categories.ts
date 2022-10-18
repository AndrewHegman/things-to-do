import { Categories } from "../../database";

export const createCategory = async (_: any, args: any) => await Categories.create(args);
