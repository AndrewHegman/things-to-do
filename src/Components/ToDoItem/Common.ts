import { ToDoItem } from "../../Interface/ToDoItem";

export interface IToDoItemProps {
  category: string;
  item: ToDoItem;
  onEdit: () => void;
  onInfo: () => void;
  onDelete: () => void;
}

export interface ICreatingNewToDoItemProps {
  category: string;
  onSubmit: (name: string) => void;
}
