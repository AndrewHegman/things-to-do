import { ToDoItem } from "../../Interface/ToDoItem";

export interface IToDoItemProps {
  category: string;
  item?: ToDoItem;
  onEdit: (text: string) => void;
  onInfo: () => void;
  onDelete: () => void;
  isEditing: boolean;
  tags: string[];
}

export interface ICreatingNewToDoItemProps {
  onSubmit: (name: string) => void;
}
