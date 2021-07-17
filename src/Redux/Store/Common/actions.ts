import { CategoryActions, CategoryActionTypes } from "../Categories/types";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../index";
import { Category } from "../../../Interface/Category";
import { categories as categoriesAPI } from "../../../API/category";

export const common = {
  getCategories: (): ThunkAction<Promise<ReturnType<typeof CategoryActions.setCategories>>, RootState, {}, CategoryActionTypes> => {
    return (dispatch) => {
      dispatch(CategoryActions.waitOnRequest());
      return categoriesAPI.getCategories().then((res) => {
        dispatch(CategoryActions.setCurrentCategory(res[0]));
        return dispatch(CategoryActions.setCategories(res as Category[]));
      });
    };
  },
} as const;
