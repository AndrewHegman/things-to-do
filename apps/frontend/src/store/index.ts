import create from "zustand";
import { CategoriesSlice, createCategoriesSlice } from "./categories";
import { createModalsSlice, ModalsSlice } from "./modals";
import { createTagsSlice, TagsSlice } from "./tags";
import { createThingsSlice, ThingsSlice } from "./things";

export const useStore = create<CategoriesSlice & ModalsSlice & TagsSlice & ThingsSlice>()((...a) => ({
  ...createCategoriesSlice(...a),
  ...createModalsSlice(...a),
  ...createTagsSlice(...a),
  ...createThingsSlice(...a),
}));
