import { CategoryActions, CategoryActionTypes } from "./types";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../index";
import { Category } from "../../../Interface/Category";
import { categories as categoriesAPI } from "../../../API/categories";
import { v4 as uuidv4 } from "uuid";
export const categories = {
  setCategories: (categories: Category[]): CategoryActionTypes => {
    return CategoryActions.setCategories(categories);
  },
  createCategory: (
    category: Omit<Category, "pathName">,
    changeCurrentCategory: boolean
  ): ThunkAction<
    Promise<ReturnType<typeof CategoryActions.setCategories | typeof CategoryActions.setCurrentCategory>>,
    RootState,
    {},
    CategoryActionTypes
  > => {
    const newCategory = {
      ...category,
      pathName: encodeURIComponent(category.displayName),
    };
    return (dispatch, getState) => {
      dispatch(CategoryActions.waitOnRequest());
      const { isSlowMode, slowModeTime } = getState().common;
      return categoriesAPI.createCategory(newCategory, isSlowMode, slowModeTime).then((res) => {
        const foo = dispatch(CategoryActions.setCategories(res as Category[]));
        return changeCurrentCategory ? dispatch(CategoryActions.setCurrentCategory(newCategory)) : foo;
      });
    };
  },
  updateCategory: (
    id: string,
    updated: Omit<Category, "key" | "pathName">
  ): ThunkAction<Promise<ReturnType<typeof CategoryActions.setCategories>>, RootState, {}, CategoryActionTypes> => {
    return (dispatch, getState) => {
      dispatch(CategoryActions.waitOnRequest());
      const { isSlowMode, slowModeTime } = getState().common;
      return categoriesAPI
        .updateCategory(id, updated, isSlowMode, slowModeTime)
        .then((res) => dispatch(CategoryActions.setCategories(res as Category[])));
    };
  },
  deleteCategory: (id: string): ThunkAction<Promise<ReturnType<typeof CategoryActions.setCategories>>, RootState, {}, CategoryActionTypes> => {
    return (dispatch, getState) => {
      dispatch(CategoryActions.waitOnRequest());
      const { isSlowMode, slowModeTime } = getState().common;
      return categoriesAPI.deleteCategory(id, isSlowMode, slowModeTime).then((res) => dispatch(CategoryActions.setCategories(res as Category[])));
    };
  },
  waitOnRequest: (): CategoryActionTypes => {
    return CategoryActions.waitOnRequest();
  },
  setCurrentCategory: (category: Category): CategoryActionTypes => {
    console.warn(
      'This is a bad idea--we should just accept an id and find said category in the store to avoid creating "fake" categories accidentally'
    );
    return CategoryActions.setCurrentCategory(category);
  },
} as const;
