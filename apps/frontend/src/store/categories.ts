import create, { StateCreator } from "zustand";
import { Category } from "@ttd/graphql";

export interface CategoriesSlice {
  categories: Category[];
  setCategories: (categories: Category[]) => void;
  currentCategory: Category | null;
  setCurrentCategory: (category: Category) => void;
}

export const createCategoriesSlice: StateCreator<CategoriesSlice, [], [], CategoriesSlice> = (set) => ({
  categories: [],
  setCategories: (categories: Category[]) => set({ categories }),
  currentCategory: null,
  setCurrentCategory: (category: Category) => set({ currentCategory: category }),
});
