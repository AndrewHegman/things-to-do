import { CategoryActions, CategoryActionTypes } from "../Categories/types";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../index";
import { Category } from "../../../Interface/Category";
import { categories as categoriesAPI } from "../../../API/categories";
import { ToDosActions, ToDosActionTypes } from "../ToDos/types";
import { toDos as toDosAPI } from "../../../API/toDos";
import { ToDoItem } from "../../../Interface/ToDoItem";
import { CommonActions, CommonActionTypes } from "./types";

export const common = {
  getCategories: (): ThunkAction<Promise<ReturnType<typeof CategoryActions.setCurrentCategory>>, RootState, {}, CategoryActionTypes> => {
    return (dispatch, getState) => {
      dispatch(CategoryActions.waitOnRequest());
      const { isSlowMode, slowModeTime } = getState().common;
      return categoriesAPI.getCategories(isSlowMode, slowModeTime).then((res) => {
        dispatch(CategoryActions.setCategories(res as Category[]));
        return dispatch(CategoryActions.setCurrentCategory(res[0]));
      });
    };
  },
  getToDos: (): ThunkAction<Promise<ReturnType<typeof ToDosActions.setToDos>>, RootState, {}, ToDosActionTypes> => {
    return (dispatch, getState) => {
      dispatch(ToDosActions.waitOnRequest());
      const { isSlowMode, slowModeTime } = getState().common;
      return toDosAPI.getAllToDos(isSlowMode, slowModeTime).then((res) => {
        return dispatch(ToDosActions.setToDos(res as ToDoItem[]));
      });
    };
  },
  setSlowMode: (slowMode: boolean): CommonActionTypes => {
    return CommonActions.setSlowMode(slowMode);
  },
  setSlowModeTime: (slowModeTime: number): CommonActionTypes => {
    return CommonActions.setSlowModeTime(slowModeTime);
  },
} as const;
