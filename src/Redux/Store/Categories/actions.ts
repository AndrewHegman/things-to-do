import { CategoryActions, CategoryActionTypes } from "./types";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../index";
import { Category } from "../../../Interface/Category";
import { categories as categoriesAPI } from "../../../API/category";

export const categories = {
  setCategories: (categories: Category[]): CategoryActionTypes => {
    return CategoryActions.setCategories(categories);
  },
  createCategory: (
    category: Category
  ): ThunkAction<Promise<ReturnType<typeof CategoryActions.setCategories>>, RootState, {}, CategoryActionTypes> => {
    return (dispatch) => {
      dispatch(CategoryActions.waitOnRequest());
      return categoriesAPI.createCategory(category).then((res) => {
        dispatch(CategoryActions.setCurrentCategory(category));
        return dispatch(CategoryActions.setCategories(res as Category[]));
      });
    };
  },
  updateCategory: (
    id: string,
    updated: Omit<Category, "key" | "pathName">
  ): ThunkAction<Promise<ReturnType<typeof CategoryActions.setCategories>>, RootState, {}, CategoryActionTypes> => {
    return (dispatch) => {
      dispatch(CategoryActions.waitOnRequest());
      return categoriesAPI.updateCategory(id, updated).then((res) => dispatch(CategoryActions.setCategories(res as Category[])));
    };
  },
  deleteCategory: (id: string): ThunkAction<Promise<ReturnType<typeof CategoryActions.setCategories>>, RootState, {}, CategoryActionTypes> => {
    return (dispatch) => {
      dispatch(CategoryActions.waitOnRequest());
      return categoriesAPI.deleteCategory(id).then((res) => dispatch(CategoryActions.setCategories(res as Category[])));
    };
  },
  waitOnRequest: (): CategoryActionTypes => {
    return CategoryActions.waitOnRequest();
  },
} as const;
