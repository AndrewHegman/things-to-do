import { ToDosActions, ToDosActionTypes } from "./types";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../index";
import { ToDoItem } from "../../../Interface/ToDoItem";
import { toDos as toDosAPI } from "../../../API/toDos";
import { v4 as uuidv4 } from "uuid";

export const toDos = {
  setToDos: (toDos: ToDoItem[]): ToDosActionTypes => {
    return ToDosActions.setToDos(toDos);
  },
  createToDo: (toDo: Omit<ToDoItem, "id">): ThunkAction<Promise<ReturnType<typeof ToDosActions.setToDos>>, RootState, {}, ToDosActionTypes> => {
    return (dispatch, getState) => {
      const { isSlowMode, slowModeTime } = getState().common;
      dispatch(ToDosActions.waitOnRequest());

      return toDosAPI
        .createItem(
          {
            ...toDo,
            id: uuidv4(),
          },
          isSlowMode,
          slowModeTime
        )
        .then((res) => {
          return dispatch(ToDosActions.setToDos(res));
        });
    };
  },
  updateToDo: (
    id: string,
    updated: Omit<ToDoItem, "id">
  ): ThunkAction<Promise<ReturnType<typeof ToDosActions.setToDos>>, RootState, {}, ToDosActionTypes> => {
    return (dispatch, getState) => {
      const { isSlowMode, slowModeTime } = getState().common;
      dispatch(ToDosActions.waitOnRequest());
      return toDosAPI.updateToDo(id, updated, isSlowMode, slowModeTime).then((res) => dispatch(ToDosActions.setToDos(res as ToDoItem[])));
    };
  },
  deleteToDo: (id: string): ThunkAction<Promise<ReturnType<typeof ToDosActions.setToDos>>, RootState, {}, ToDosActionTypes> => {
    return (dispatch, getState) => {
      const { isSlowMode, slowModeTime } = getState().common;
      dispatch(ToDosActions.waitOnRequest());
      return toDosAPI.deleteItem(id, isSlowMode, slowModeTime).then((res) => dispatch(ToDosActions.setToDos(res as ToDoItem[])));
    };
  },
  waitOnRequest: (): ToDosActionTypes => {
    return ToDosActions.waitOnRequest();
  },
} as const;
