import { categories } from "./categories";
import { tags } from "./tags";
import { things } from "./things";

export const queries = {
  ...categories,
  ...tags,
  ...things,
};
