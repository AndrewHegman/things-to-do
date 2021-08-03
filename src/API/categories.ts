import { categories as categoriesData } from "../Data/Category";
import { Category } from "../Interface/Category";
import { resolveSlowPromiseWrapper, rejectSlowPromiseWrapper } from "./common";

export const categories = {
  getCategoryById: async (categoryId: string, isSlowMode: boolean, slowModeTime: number) => {
    return resolveSlowPromiseWrapper(
      categoriesData.find((category) => category.key === categoryId),
      isSlowMode,
      slowModeTime
    );
  },

  getCategories: async (isSlowMode: boolean, slowModeTime: number) => {
    return resolveSlowPromiseWrapper(categoriesData, isSlowMode, slowModeTime);
  },

  createCategory: async (newCategory: Category, isSlowMode: boolean, slowModeTime: number) => {
    if (newCategory.displayName === "") {
      throw rejectSlowPromiseWrapper(`Categories must have a valid name`, isSlowMode, slowModeTime);
    }
    if (categoriesData.find((category) => category.displayName === newCategory.displayName)) {
      throw rejectSlowPromiseWrapper(
        `A category named ${newCategory.displayName} already exists!`,
        isSlowMode,
        slowModeTime
      );
    }
    categoriesData.push(newCategory);
    return resolveSlowPromiseWrapper(categoriesData, isSlowMode, slowModeTime);
  },

  updateCategory: async (
    categoryId: string,
    updated: Partial<Omit<Category, "key" | "pathname">>,
    isSlowMode: boolean,
    slowModeTime: number
  ) => {
    const categoryToChange = categoriesData.find((category) => category.key === categoryId);
    if (!categoryToChange) {
      throw rejectSlowPromiseWrapper(`No category found with id ${categoryId}`, isSlowMode, slowModeTime);
    }

    if (updated.displayName) {
      categoryToChange.displayName = updated.displayName;
    }

    return resolveSlowPromiseWrapper(categoriesData, isSlowMode, slowModeTime);
  },

  deleteCategory: async (categoryId: string, isSlowMode: boolean, slowModeTime: number) => {
    const categoryIdx = categoriesData.findIndex((category) => category.key === categoryId);
    if (categoryIdx === -1) {
      throw rejectSlowPromiseWrapper(`No category found with id ${categoryId}`, isSlowMode, slowModeTime);
    }
    categoriesData.splice(categoryIdx, 1);

    return resolveSlowPromiseWrapper(categoriesData, isSlowMode, slowModeTime);
  },
};
