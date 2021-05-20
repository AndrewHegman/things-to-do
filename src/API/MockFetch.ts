import { categories } from "../Data/Category";
import { data } from "../Data/Data";

export const getCategories = () => {
  return Promise.resolve(categories);
};

export const getToDos = (categoryKey: string) => {
  return Promise.resolve(data[categoryKey]);
};
