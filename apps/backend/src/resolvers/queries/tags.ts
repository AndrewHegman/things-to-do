import { Tags } from "../../database";

export const tagsByCategory = async (_: any, args: any) => await Tags.getByCategoryId(args.categoryId);
export const tags = async () => await Tags.getAll();
