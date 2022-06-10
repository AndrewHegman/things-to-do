import { categories as categoriesData } from "../Data/Category";
import { Category } from "../Interface/Category";
import { resolveSlowPromiseWrapper, rejectSlowPromiseWrapper } from "./common";

export const categories = {
  getCategoryById: async (categoryId: string, slowModeTime: number) => {
    return resolveSlowPromiseWrapper(
      categoriesData.find((category) => category._id === categoryId),

      slowModeTime
    );
  },

  getCategories: async (slowModeTime: number) => {
    return resolveSlowPromiseWrapper(categoriesData, slowModeTime);
  },

  createCategory: async (newCategory: Omit<Category, "_id">, slowModeTime: number) => {
    if (newCategory.displayName === "") {
      return rejectSlowPromiseWrapper(`Categories must have a valid name`, slowModeTime);
    }
    if (categoriesData.find((category) => category.displayName === newCategory.displayName)) {
      return rejectSlowPromiseWrapper(`A category named ${newCategory.displayName} already exists!`, slowModeTime);
    }
    const _newCategory = { ...newCategory, _id: `${categoriesData.length}` };
    categoriesData.push(_newCategory);
    return resolveSlowPromiseWrapper(categoriesData, slowModeTime);
  },

  updateCategory: async (categoryId: string, updated: Partial<Omit<Category, "_id">>, slowModeTime: number) => {
    const categoryToChange = categoriesData.find((category) => category._id === categoryId);
    if (!categoryToChange) {
      return rejectSlowPromiseWrapper(`No category found with id ${categoryId}`, slowModeTime);
    }

    if (updated.displayName) {
      categoryToChange.displayName = updated.displayName;
    }

    return resolveSlowPromiseWrapper(categoriesData, slowModeTime);
  },

  deleteCategory: async (categoryId: string, slowModeTime: number) => {
    const categoryIdx = categoriesData.findIndex((category) => category._id === categoryId);
    if (categoryIdx === -1) {
      return rejectSlowPromiseWrapper(`No category found with id ${categoryId}`, slowModeTime);
    }
    categoriesData.splice(categoryIdx, 1);

    return resolveSlowPromiseWrapper(categoriesData, slowModeTime);
  },
};
