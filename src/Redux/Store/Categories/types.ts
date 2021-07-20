import { Category } from "../../../Interface/Category";
import { ActionType } from "../../common";

export const actionTypes = {
  SET_CATEGORIES: "SET_CATEGORIES",
  // CREATE_CATEGORY: "CREATE_CATEGORY",
  // UPDATE_CATEGORY: "UPDATE_CATEGORY",
  // DELETE_CATEGORY: "DELETE_CATEGORY",
  WAIT_ON_REQUEST: "WAIT_ON_REQUEST",
  SET_CURRENT_CATEGORY: "SET_CURRENT_CATEGORY",
} as const;

export interface CategoriesState {
  categories: Category[];
  isCategoriesLoading: boolean;
  currentCategory: Category;
}

export const CategoryActions = {
  setCategories: (categories: Category[]) =>
    ({
      type: actionTypes.SET_CATEGORIES,
      categories,
    } as const),
  setCurrentCategory: (category: Category) =>
    ({
      type: actionTypes.SET_CURRENT_CATEGORY,
      category,
    } as const),
  // createCategory: (category: Category) =>
  //   ({
  //     type: actionTypes.CREATE_CATEGORY,
  //     category,
  //   } as const),
  // updateCategory: (id: string, updated: Omit<Category, "key" | "pathName">) =>
  //   ({
  //     type: actionTypes.UPDATE_CATEGORY,
  //     id,
  //     updated,
  //   } as const),
  // deleteCategory: (id: string) =>
  //   ({
  //     type: actionTypes.DELETE_CATEGORY,
  //     id,
  //   } as const),
  waitOnRequest: () =>
    ({
      type: actionTypes.WAIT_ON_REQUEST,
    } as const),
};

export type CategoryActionTypes = ActionType<typeof CategoryActions>;
