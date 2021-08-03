import { RootState } from "../";
import { ToDoItem } from "../../../Interface/ToDoItem";

export const toDos = {
  getCurrentToDos: (state: RootState): ToDoItem[] => {
    return state.toDos.toDos.filter((toDo) => state.categories.currentCategory.key === toDo.categoryKey);
  },
};
