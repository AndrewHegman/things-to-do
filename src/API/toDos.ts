import { resolveSlowPromiseWrapper, rejectSlowPromiseWrapper } from "./common";
import { items as toDoItems } from "../Data/Items";
import { ToDoItem } from "../Interface/ToDoItem";

export const toDos = {
  getAllToDos: (slowModeTime: number) => {
    return resolveSlowPromiseWrapper(toDoItems, slowModeTime);
  },

  getToDosByCategoryKey: (categoryKey: string, slowModeTime: number) => {
    return resolveSlowPromiseWrapper(
      toDoItems.filter((item) => item.categoryKey === categoryKey),

      slowModeTime
    );
  },

  createItem: (newItem: Omit<ToDoItem, "id">, slowModeTime: number) => {
    if (!newItem.categoryKey) {
      return rejectSlowPromiseWrapper("All ToDos must have a valid category key", slowModeTime);
    }

    if (!newItem.name) {
      return rejectSlowPromiseWrapper("All ToDos must have a valid name", slowModeTime);
    }
    const _newItem = { ...newItem, id: `${toDoItems.length}` };
    toDoItems.push(_newItem);
    return resolveSlowPromiseWrapper(_newItem, slowModeTime);
  },

  updateToDo: (id: string, updated: Partial<Omit<ToDoItem, "id">>, slowModeTime: number) => {
    const toDoToChange = toDoItems.find((toDo) => toDo.id === id);
    if (!toDoToChange) {
      return rejectSlowPromiseWrapper(`No category found with id ${id}`, slowModeTime);
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

    return resolveSlowPromiseWrapper(toDoItems, slowModeTime);
  },

  deleteItem: (id: string, slowModeTime: number) => {
    const idx = toDoItems.findIndex((item) => item.id === id);
    if (idx === -1) {
      return rejectSlowPromiseWrapper(`No ToDo item found with id ${id}`, slowModeTime);
    }
    toDoItems.splice(idx, 1);
    return resolveSlowPromiseWrapper(toDoItems, slowModeTime);
  },
};
