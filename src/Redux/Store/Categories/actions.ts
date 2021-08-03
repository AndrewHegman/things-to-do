import { CategoryActions, CategoryActionTypes } from "./types";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../index";
import { Category } from "../../../Interface/Category";

export const categories = {
  setCategories: (categories: Category[]): CategoryActionTypes => {
    return CategoryActions.setCategories(categories);
  },
  setCurrentCategory: (
    categoryKey: string
  ): ThunkAction<ReturnType<typeof CategoryActions.setCurrentCategory>, RootState, {}, CategoryActionTypes> => {
    return (dispatch, getState) => {
      const { categories, currentCategory } = getState().categories;
      const newCategory = categories.find((category) => category.key === categoryKey);
      console.log(categories);
      if (!newCategory) {
        console.error(
          `WARNING - Attempting to set category to an unknown category (id ${categoryKey}). This is undefined. Not changing current category`
        );
      }
      return dispatch(CategoryActions.setCurrentCategory(newCategory || currentCategory));
    };
  },
} as const;
