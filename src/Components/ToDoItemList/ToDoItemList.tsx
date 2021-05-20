import React from "react";
import { Container, Box } from "@material-ui/core";
import { ToDoItemEntry } from "../ToDoItem/ToDoItem";
import { useToDoItemListStyles } from "./ToDoItemList.styles";
import { ToDoItem } from "../../Interface/ToDoItem";
import { CreateNewToDoItem } from "../CreateNewToDoItem/Mobile";

interface IToDoListItemProps {
  categoryName: string;
  items: ToDoItem[];
}

export const ToDoItemList: React.FC<IToDoListItemProps> = (props) => {
  const classes = useToDoItemListStyles();

  const onEdit = (id: string) => {
    console.log(`edit ${id}`);
  };
  const onInfo = (id: string) => {
    console.log(`info ${id}`);
  };
  const onDelete = (id: string) => {
    console.log(`delete ${id}`);
  };

  return (
    <Container className={classes.contentContainer}>
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
            <CreateNewToDoItem />
          </>
        )}
      </Box>
    </Container>
  );
};
