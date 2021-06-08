import { categories } from "../Data/Category";
import { items } from "../Data/Items";
import { Category } from "../Interface/Category";
import { ToDoItem } from "../Interface/ToDoItem";

let slowMode = false;

const resolveSlowPromiseWrapper = <T>(resData: T) => {
  return new Promise<T>((res) => setTimeout(() => res(resData), slowMode ? 2000 : 0));
};

const rejectSlowPromiseWrapper = <T>(resData: T) => {
  return new Promise<T>((res) => setTimeout(() => res(resData), slowMode ? 2000 : 0));
};

export const getCategories = () => {
  return resolveSlowPromiseWrapper(categories);
};

export const getToDos = (categoryName: string) => {
  return resolveSlowPromiseWrapper(items.filter((item) => item.categoryKey === categoryName));
};

export const getToDosByKey = (categoryKey: string) => {
  return resolveSlowPromiseWrapper(items.filter((item) => item.categoryKey === categoryKey));
};

export const createCategory = (newCategory: Omit<Category, "key">) => {
  if (categories.find((category) => category.displayName === newCategory.displayName)) {
    rejectSlowPromiseWrapper(`A category named ${newCategory.displayName} already exists!`);
  }
  const _newCategory = { ...newCategory, key: `${categories.length}` };
  categories.push(_newCategory);
  return resolveSlowPromiseWrapper(_newCategory);
};

export const createItem = (newItem: Omit<ToDoItem, "id">) => {
  const _newItem = { ...newItem, id: `${items.length}` };
  items.push(_newItem);
  return resolveSlowPromiseWrapper(_newItem);
};

export const deleteItem = (id: string) => {
  const idx = items.findIndex((item) => item.id === id);
  if (idx > -1) {
    items.splice(
      items.findIndex((item) => item.id === id),
      1
    );
  }
  return resolveSlowPromiseWrapper({});
};

export const toggleSlowMode = () => {
  slowMode = !slowMode;
};

export const getSlowMode = () => {
  return slowMode;
};
