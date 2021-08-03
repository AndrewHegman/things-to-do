import { ToDosActions, ToDosActionTypes } from "./types";
import { ToDoItem } from "../../../Interface/ToDoItem";

export const toDos = {
  setToDos: (toDos: ToDoItem[]): ToDosActionTypes => {
    return ToDosActions.setToDos(toDos);
  },
} as const;
