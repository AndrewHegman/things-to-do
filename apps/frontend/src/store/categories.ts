import create, { StateCreator } from "zustand";
import { Category } from "@ttd/graphql";

export interface CategoriesSlice {
  categories: Category[];
  setCategories: (categories: Category[]) => void;
}

export const createCategoriesSlice: StateCreator<CategoriesSlice, [], [], CategoriesSlice> = (set) => ({
  categories: [],
  setCategories: (categories: Category[]) => set({ categories }),
});
