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

export const createCategory = (newCategory: Category) => {
  categories.push(newCategory);
  return Promise.resolve(newCategory);
};

export const createItem = (newItem: Omit<ToDoItem, "id">) => {
  items.push({ ...newItem, id: `${items.length}` });
  return Promise.resolve(newItem);
};

export const deleteItem = (id: string) => {
  items.splice(
    items.findIndex((item) => item.id === id),
    1
  );
  return Promise.resolve();
};
