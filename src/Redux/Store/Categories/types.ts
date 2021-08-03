import { Category } from "../../../Interface/Category";
import { ActionType } from "../../common";

export const actionTypes = {
  SET_CATEGORIES: "SET_CATEGORIES",

  SET_CURRENT_CATEGORY: "SET_CURRENT_CATEGORY",
} as const;

export interface CategoriesState {
  categories: Category[];
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
};

export type CategoryActionTypes = ActionType<typeof CategoryActions>;
