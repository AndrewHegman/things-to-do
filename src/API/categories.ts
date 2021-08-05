import { Category } from "../Interface/Category";
import { resolveSlowPromiseWrapper, URLBuilder } from "./common";

export const categories = {
  getCategoryById: async (categoryId: string, isSlowMode: boolean, slowModeTime: number) => {
    const urlBuilder = new URLBuilder();
    return resolveSlowPromiseWrapper(urlBuilder.get().categories().byId(categoryId).fetch(), isSlowMode, slowModeTime);
  },

  getCategories: async (isSlowMode: boolean, slowModeTime: number) => {
    const urlBuilder = new URLBuilder();
    return resolveSlowPromiseWrapper(urlBuilder.get().categories().fetch(), isSlowMode, slowModeTime);
  },

  createCategory: async (newCategory: Category, isSlowMode: boolean, slowModeTime: number) => {
    const urlBuilder = new URLBuilder();

    return resolveSlowPromiseWrapper(
      urlBuilder.create().categories().withBody(JSON.stringify(newCategory)).fetch(),
      isSlowMode,
      slowModeTime
    );
  },

  updateCategory: async (
    categoryId: string,
    updated: Partial<Omit<Category, "key" | "pathname">>,
    isSlowMode: boolean,
    slowModeTime: number
  ) => {
    const urlBuilder = new URLBuilder();

    return resolveSlowPromiseWrapper(
      urlBuilder.update().categories().byId(categoryId).withBody(JSON.stringify(updated)).fetch(),
      isSlowMode,
      slowModeTime
    );
  },

  deleteCategory: async (categoryId: string, isSlowMode: boolean, slowModeTime: number): Promise<Category[]> => {
    const urlBuilder = new URLBuilder();

    return resolveSlowPromiseWrapper(urlBuilder.delete().categories().byId(categoryId).fetch(), isSlowMode, slowModeTime);
  },
};
