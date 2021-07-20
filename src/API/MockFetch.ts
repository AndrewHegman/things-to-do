export const foo = "";

// import { categories } from "../Data/Category";
// import { items } from "../Data/Items";
// import { Category } from "../Interface/Category";
// import { ToDoItem } from "../Interface/ToDoItem";

// let slowMode = false;
// const slowModeTime = 2000;

// const resolveSlowPromiseWrapper = <T>(resData: T) => {
//   return new Promise<T>((res) => setTimeout(() => res(resData), slowMode ? slowModeTime : 0));
// };

// const rejectSlowPromiseWrapper = <T>(resData: T) => {
//   return new Promise<T>((res) => setTimeout(() => res(resData), slowMode ? slowModeTime : 0));
// };

// export const getToDos = (categoryName: string) => {
//   return resolveSlowPromiseWrapper(items.filter((item) => item.categoryKey === categoryName));
// };

// export const getToDosByKey = (categoryKey: string) => {
//   return resolveSlowPromiseWrapper(items.filter((item) => item.categoryKey === categoryKey));
// };

// export const createItem = (newItem: Omit<ToDoItem, "id">) => {
//   const _newItem = { ...newItem, id: `${items.length}` };
//   items.push(_newItem);
//   return resolveSlowPromiseWrapper(_newItem);
// };

// export const deleteItem = (id: string) => {
//   const idx = items.findIndex((item) => item.id === id);
//   if (idx > -1) {
//     items.splice(
//       items.findIndex((item) => item.id === id),
//       1
//     );
//   }
//   return resolveSlowPromiseWrapper({});
// };

// export const toggleSlowMode = () => {
//   slowMode = !slowMode;
// };

// export const getSlowMode = () => {
//   return slowMode;
// };
