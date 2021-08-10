import { Tag } from "./Tags";

export type ToDoItemResponse = {
  id: string;
  name: string;
  tags: string[];
  categoryKey: string;
};

export type ToDoItem = {
  id: string;
  name: string;
  tags: string[];
  categoryKey: string;
};
