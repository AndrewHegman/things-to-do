import { Tags } from "../../database";

export const tagsByCategory = async (_: any, args: any) => await Tags.getByCategoryId(args.categoryId);
export const tags = async () => {
  console.log("here");
  const res = await Tags.getAll();
  console.log(res);
  return res;
};
