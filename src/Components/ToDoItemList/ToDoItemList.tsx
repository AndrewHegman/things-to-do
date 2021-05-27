import React from "react";
import { Container, Box } from "@material-ui/core";
import { ToDoItemEntry } from "../ToDoItem/ToDoItem";
import { useToDoItemListStyles } from "./ToDoItemList.styles";
import { ToDoItem } from "../../Interface/ToDoItem";
import { CreateNewToDoItem } from "../CreateNewToDoItem/Mobile";
import { AddNewToDoItemButton } from "../AddNewToDoItemButton/AddNewToDoItemButton";
import { CreatingNewToDoItem } from "../ToDoItem/Mobile";

interface IToDoListItemProps {
  categoryName: string;
  items: ToDoItem[];
  isCreatingNewItem: boolean;
  onSubmitNewItem: (name: string) => void;
  onDeleteItem: (id: string) => void;
}

export const ToDoItemList: React.FC<IToDoListItemProps> = (props) => {
  const { isCreatingNewItem, onSubmitNewItem, onDeleteItem } = props;

  const classes = useToDoItemListStyles();

  const onEdit = (id: string) => {
    console.log(`edit ${id}`);
  };
  const onInfo = (id: string) => {
    console.log(`info ${id}`);
  };
  const onDelete = (id: string) => {
    onDeleteItem(id);
  };

  return (
    <Container className={classes.contentContainer} disableGutters>
      <Box>
        {props.items && (
          <>
            {props.items.map((item, i) => (
              <ToDoItemEntry
                onEdit={() => onEdit(item.id)}
                onInfo={() => onInfo(item.id)}
                onDelete={() => onDelete(item.id)}
                key={i}
                item={item}
                category={props.categoryName}
              />
            ))}
            {isCreatingNewItem && <CreatingNewToDoItem category={props.categoryName} onSubmit={onSubmitNewItem} />}
          </>
        )}
      </Box>
    </Container>
  );
};
