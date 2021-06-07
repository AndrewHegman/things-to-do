import { categories } from "../Data/Category";
import { items } from "../Data/Items";
import { Category } from "../Interface/Category";
import { ToDoItem } from "../Interface/ToDoItem";

export const getCategories = () => {
  return Promise.resolve(categories);
};

export const getToDos = (categoryKey: string) => {
  return Promise.resolve(items.filter((item) => item.categoryKey === categoryKey));
};

export const createCategory = (newCategory: Omit<Category, "key">) => {
  if (categories.find((category) => category.displayName === newCategory.displayName)) {
    return Promise.reject(`A category named ${newCategory.displayName} already exists!`);
  }
  const _newCategory = { ...newCategory, key: `${categories.length}` };
  categories.push(_newCategory);
  return Promise.resolve(_newCategory);
};

export const createItem = (newItem: Omit<ToDoItem, "id">) => {
  const _newItem = { ...newItem, id: `${items.length}` };
  items.push(_newItem);
  return Promise.resolve(_newItem);
};

export const deleteItem = (id: string) => {
  items.splice(
    items.findIndex((item) => item.id === id),
    1
  );
  return Promise.resolve();
};
