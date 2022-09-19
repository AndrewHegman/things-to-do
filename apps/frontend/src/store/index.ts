import create from "zustand";
import { CategoriesSlice, createCategoriesSlice } from "./categories";
import { createModalsSlice, ModalsSlice } from "./modals";
import { createTagsSlice, TagsSlice } from "./tags";

export const useStore = create<CategoriesSlice & ModalsSlice & TagsSlice>()((...a) => ({
  ...createCategoriesSlice(...a),
  ...createModalsSlice(...a),
  ...createTagsSlice(...a),
}));
