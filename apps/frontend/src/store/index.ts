import create from "zustand";
import { CategoriesSlice, createCategoriesSlice } from "./categories";
import { createModalsSlice, ModalsSlice } from "./modals";

export const useStore = create<CategoriesSlice & ModalsSlice>()((...a) => ({
  ...createCategoriesSlice(...a),
  ...createModalsSlice(...a),
}));
