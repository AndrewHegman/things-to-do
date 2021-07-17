import { ToDoItem } from "../../Interface/ToDoItem";

export interface IToDoItemProps {
  category: string;
  item: ToDoItem;
  onEdit: () => void;
  onInfo: () => void;
  onDelete: () => void;
}

export interface ICreatingNewToDoItemProps {
  onSubmit: (name: string) => void;
}
