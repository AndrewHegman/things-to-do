import { Tag } from "./Tags";

export type ToDoItem = {
  id: string;
  name: string;
  tags: string[];
  categoryKey: string;
};
