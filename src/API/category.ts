import { categories as categoriesData } from "../Data/Category";
import { Category } from "../Interface/Category";
import { resolveSlowPromiseWrapper, rejectSlowPromiseWrapper } from "./common";

export const categories = {
  getCategoryById: async (categoryId: string) => {
    return resolveSlowPromiseWrapper(categoriesData.find((category) => category.key === categoryId));
  },

  getCategories: async () => {
    return resolveSlowPromiseWrapper(categoriesData);
  },

  createCategory: async (newCategory: Omit<Category, "key">) => {
    if (newCategory.displayName === "") {
      return rejectSlowPromiseWrapper(`Categories must have a valid name`);
    }
    if (categoriesData.find((category) => category.displayName === newCategory.displayName)) {
      return rejectSlowPromiseWrapper(`A category named ${newCategory.displayName} already exists!`);
    }
    const _newCategory = { ...newCategory, key: `${categoriesData.length}` };
    categoriesData.push(_newCategory);
    return resolveSlowPromiseWrapper(categoriesData);
  },

  updateCategory: async (categoryId: string, updated: Partial<Omit<Category, "key" | "pathname">>) => {
    const categoryToChange = categoriesData.find((category) => category.key === categoryId);
    if (!categoryToChange) {
      return rejectSlowPromiseWrapper(`No category found with id ${categoryId}`);
    }

    if (updated.displayName) {
      categoryToChange.displayName = updated.displayName;
    }

    return resolveSlowPromiseWrapper(categoriesData);
  },

  deleteCategory: async (categoryId: string) => {
    const categoryIdx = categoriesData.findIndex((category) => category.key === categoryId);
    if (categoryIdx === -1) {
      return rejectSlowPromiseWrapper(`No category found with id ${categoryId}`);
    }
    categoriesData.splice(categoryIdx, 1);

    return resolveSlowPromiseWrapper(categoriesData);
  },
};
