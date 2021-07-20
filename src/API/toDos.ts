import { resolveSlowPromiseWrapper, rejectSlowPromiseWrapper } from "./common";
import { items as toDoItems } from "../Data/Items";
import { ToDoItem } from "../Interface/ToDoItem";

export const toDos = {
  getAllToDos: (isSlowMode: boolean, slowModeTime: number) => {
    return resolveSlowPromiseWrapper(toDoItems, isSlowMode, slowModeTime);
  },

  getToDosByCategoryKey: (categoryKey: string, isSlowMode: boolean, slowModeTime: number) => {
    return resolveSlowPromiseWrapper(
      toDoItems.filter((item) => item.categoryKey === categoryKey),
      isSlowMode,
      slowModeTime
    );
  },

  createItem: (newItem: ToDoItem, isSlowMode: boolean, slowModeTime: number) => {
    toDoItems.push(newItem);
    return resolveSlowPromiseWrapper(toDoItems, isSlowMode, slowModeTime);
  },

  updateToDo: (id: string, updated: Partial<Omit<ToDoItem, "id">>, isSlowMode: boolean, slowModeTime: number): Promise<ToDoItem[] | string> => {
    const toDoToChange = toDoItems.find((toDo) => toDo.id === id);
    if (!toDoToChange) {
      return rejectSlowPromiseWrapper(`No category found with id ${id}`, isSlowMode, slowModeTime);
    }

    if (updated.categoryKey) {
      toDoToChange.categoryKey = updated.categoryKey;
    }

    if (updated.name) {
      toDoToChange.name = updated.name;
    }

    if (updated.tags) {
      toDoToChange.tags = updated.tags;
    }

    return resolveSlowPromiseWrapper(toDoItems, isSlowMode, slowModeTime);
  },

  deleteItem: (id: string, isSlowMode: boolean, slowModeTime: number): Promise<ToDoItem[] | string> => {
    const idx = toDoItems.findIndex((item) => item.id === id);
    if (idx === -1) {
      return rejectSlowPromiseWrapper(`No ToDo item found with id ${id}`, isSlowMode, slowModeTime);
    }
    toDoItems.splice(idx, 1);
    return resolveSlowPromiseWrapper(toDoItems, isSlowMode, slowModeTime);
  },
};
