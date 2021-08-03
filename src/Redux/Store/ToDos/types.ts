import { ToDoItem } from "../../../Interface/ToDoItem";
import { ActionType } from "../../common";

export const actionTypes = {
  SET_TODOS: "SET_TODOS",
} as const;

export interface ToDosState {
  toDos: ToDoItem[];
}

export const ToDosActions = {
  setToDos: (toDos: ToDoItem[]) =>
    ({
      type: actionTypes.SET_TODOS,
      toDos,
    } as const),
};

export type ToDosActionTypes = ActionType<typeof ToDosActions>;
