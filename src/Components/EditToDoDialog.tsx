import React from "react";
import { ToDoItem } from "../Interface/ToDoItem";
import { CreateToDoDialog } from "./CreateToDoDialog";

export interface IEditToDoDialogProps {
  isOpen: boolean;
  toDo: ToDoItem;
  onClose: (didUpdate: boolean) => void;
}

export const EditToDoDialog: React.FC<IEditToDoDialogProps> = (props) => {
  const { onClose, toDo, isOpen } = props;
  return <CreateToDoDialog onClose={onClose} isOpen={isOpen} existingToDo={toDo} />;
};
