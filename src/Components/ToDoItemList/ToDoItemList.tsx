import React from "react";
import { Container, Box } from "@material-ui/core";
import { ToDoItemEntry } from "../ToDoItem/ToDoItem";
import { useToDoItemListStyles } from "./ToDoItemList.styles";
import { ToDoItem } from "../../Interface/ToDoItem";
import { CreateNewToDoItem } from "../CreateNewToDoItem/Mobile";
import { AddNewToDoItemButton } from "../AddNewToDoItemButton/AddNewToDoItemButton";
import { CreatingNewToDoItem } from "../ToDoItem/Mobile";
import { Category } from "../../Interface/Category";
import { createItem, deleteItem, getToDos } from "../../API/MockFetch";
import { useRouteMatch } from "react-router";
import { IMatchParameters } from "../../Interface/Router";

interface IToDoListItemProps {
  onDeleteItem: (id: string) => void;
}

export const ToDoItemList: React.FC<IToDoListItemProps> = (props) => {
  const { onDeleteItem } = props;

  const [todos, setTodos] = React.useState<ToDoItem[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [isCreatingNewItem, setIsCreatingNewItem] = React.useState<boolean>(false);
  const [isReloadNeeded, setIsReloadNeeded] = React.useState<boolean>(false);

  const classes = useToDoItemListStyles();
  const match = useRouteMatch<IMatchParameters>();

  React.useEffect(() => {
    loadTodos();
  }, [match.params.category]);

  React.useEffect(() => {
    loadTodos();
  }, [isReloadNeeded]);

  const onEdit = (id: string) => {
    console.log(`edit ${id}`);
  };
  const onInfo = (id: string) => {
    console.log(`info ${id}`);
  };
  const onDelete = (id: string) => {
    deleteItem(id).then(() => setIsReloadNeeded(true));
  };

  const loadTodos = () => {
    setIsLoading(true);
    getToDos(match.params.category).then((todos) => {
      setTodos(todos);
      setIsLoading(false);
      setIsReloadNeeded(false);
    });
  };

  const onAddNewItem = () => {
    setIsCreatingNewItem(true);
  };

  const onSubmitNewItem = (text: string) => {
    setIsCreatingNewItem(false);
    // createItem({
    //   name: text,
    //   categoryKey: category.key,
    //   tags: [],
    // }).then((newTodo) => {
    //   // This isn't the best way to do this...this could cause some weird flickering,
    //   // but its quick and easy and it ensures the server stays up to date with UI
    //   setTodos([...todos, newTodo]);
    //   loadTodos();
    // });
  };

  return (
    <Container className={classes.contentContainer} disableGutters>
      <Box>
        {!isLoading && (
          <>
            {todos.map((item, i) => (
              <ToDoItemEntry
                onEdit={() => onEdit(item.id)}
                onInfo={() => onInfo(item.id)}
                onDelete={() => onDelete(item.id)}
                key={i}
                item={item}
                category={match.params.category.charAt(0).toUpperCase() + match.params.category.slice(1)}
              />
            ))}
            {!isCreatingNewItem && <AddNewToDoItemButton onClick={onAddNewItem} />}

            {isCreatingNewItem && <CreatingNewToDoItem category={match.params.category} onSubmit={onSubmitNewItem} />}
          </>
        )}
      </Box>
    </Container>
  );
};
