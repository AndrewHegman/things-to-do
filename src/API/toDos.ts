import { resolveSlowPromiseWrapper, rejectSlowPromiseWrapper } from "./common";
import { items as toDoItems } from "../Data/Items";
import { ToDoItem } from "../Interface/ToDoItem";

export const toDos = {
  getAllToDos: (slowModeTime: number) => {
    return resolveSlowPromiseWrapper(toDoItems, slowModeTime);
  },

  getToDosByCategoryKey: (category: string, slowModeTime: number) => {
    return resolveSlowPromiseWrapper(
      toDoItems.filter((item) => item.category === category),

      slowModeTime
    );
  },

  createItem: (newItem: Omit<ToDoItem, "_id">, slowModeTime: number) => {
    if (!newItem.category) {
      return rejectSlowPromiseWrapper("All ToDos must have a valid category key", slowModeTime);
    }

    if (!newItem.name) {
      return rejectSlowPromiseWrapper("All ToDos must have a valid name", slowModeTime);
    }
    const _newItem = { ...newItem, _id: `${toDoItems.length}` };
    toDoItems.push(_newItem);
    return resolveSlowPromiseWrapper(_newItem, slowModeTime);
  },

  updateToDo: (_id: string, updated: Partial<Omit<ToDoItem, "_id">>, slowModeTime: number) => {
    const toDoToChange = toDoItems.find((toDo) => toDo._id === _id);
    if (!toDoToChange) {
      return rejectSlowPromiseWrapper(`No category found with id ${_id}`, slowModeTime);
    }

    if (updated.category) {
      toDoToChange.category = updated.category;
    }

    if (updated.name) {
      toDoToChange.name = updated.name;
    }

    if (updated.tags) {
      toDoToChange.tags = updated.tags;
    }

    return resolveSlowPromiseWrapper(toDoItems, slowModeTime);
  },

  deleteItem: (_id: string, slowModeTime: number) => {
    const idx = toDoItems.findIndex((item) => item._id === _id);
    if (idx === -1) {
      return rejectSlowPromiseWrapper(`No ToDo item found with id ${_id}`, slowModeTime);
    }
    toDoItems.splice(idx, 1);
    return resolveSlowPromiseWrapper(toDoItems, slowModeTime);
  },
};
