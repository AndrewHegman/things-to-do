import { Category } from "../../../Interface/Category";
import { ToDoItem } from "../../../Interface/ToDoItem";
import { ActionType } from "../../common";

export const actionTypes = {
  SET_TODOS: "SET_TODOS",
  WAIT_ON_REQUEST: "WAIT_ON_TODOS_REQUEST",
  SET_CURRENT_TODOS: "SET_CURRENT_TODOS",
} as const;

export interface ToDosState {
  toDos: ToDoItem[];
  isLoading: boolean;
  // currentToDos: ToDoItem[];
}

export const ToDosActions = {
  setToDos: (toDos: ToDoItem[]) =>
    ({
      type: actionTypes.SET_TODOS,
      toDos,
    } as const),

  setCurrentToDos: (toDos: ToDoItem[]) =>
    ({
      type: actionTypes.SET_CURRENT_TODOS,
      toDos,
    } as const),

  waitOnRequest: () =>
    ({
      type: actionTypes.WAIT_ON_REQUEST,
    } as const),
};

export type ToDosActionTypes = ActionType<typeof ToDosActions>;
