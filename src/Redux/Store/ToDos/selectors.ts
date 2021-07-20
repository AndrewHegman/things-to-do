import { RootState } from "../";
import { ToDoItem } from "../../../Interface/ToDoItem";

export const toDos = {
  getCurrentToDos: (state: RootState): ToDoItem[] => {
    console.log(state.toDos.isLoading);
    return state.toDos.toDos.filter((toDo) => state.categories.currentCategory.key === toDo.categoryKey);
  },
};
