import { Tag } from "./Tags";

export type ToDoItem = {
  _id: string;
  name: string;
  tags: Tag[];
  category: string;
};
