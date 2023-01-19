import { tags } from "./tags";
import { things } from "./things";
import { categories } from "./categories";

export const mutations = {
  ...tags,
  ...things,
  ...categories,
};
