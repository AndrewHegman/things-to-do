import { Category } from "@ttd/graphql";
import create, { StateCreator } from "zustand";

export interface CategoriesSlice {
  categories: Category[];
  setCategories: (categories: Category[]) => void;
  currentCategory: Category;
  setCurrentCategory: (category: Category) => void;
}

export const createCategoriesSlice: StateCreator<CategoriesSlice, [], [], CategoriesSlice> = (set) => ({
  categories: [],
  setCategories: (categories: Category[]) => set({ categories }),
  currentCategory: {} as Category,
  setCurrentCategory: (category: Category) => set({ currentCategory: category }),
});
