import React from "react";
import { Container, Box, Dialog, DialogContent, DialogContentText, Typography, CircularProgress } from "@material-ui/core";
import { ToDoItemEntry } from "../ToDoItem/ToDoItem";
import { useToDoItemListStyles } from "./ToDoItemList.styles";
import { ToDoItem } from "../../Interface/ToDoItem";
import { CreateNewToDoItem } from "../CreateNewToDoItem/Mobile";
import { AddNewToDoItemButton } from "../AddNewToDoItemButton/AddNewToDoItemButton";
import { CreatingNewToDoItem } from "../ToDoItem/Mobile";
import { Category } from "../../Interface/Category";
import { createItem, deleteItem, getToDosByKey } from "../../API/MockFetch";
import { useRouteMatch } from "react-router";
import { IMatchParameters } from "../../Interface/Router";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../Redux/store";

interface IToDoListItemProps extends PropsFromRedux {
  onDeleteItem: (id: string) => void;
}

const mapStateToProps = (state: RootState) => {
  return {
    isLoading: state.categories.isLoading,
    currentCategory: state.categories.currentCategory,
  };
};

export const ToDoItemListComponent: React.FC<IToDoListItemProps> = (props) => {
  const { onDeleteItem } = props;

  const [todos, setTodos] = React.useState<ToDoItem[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isCreatingNewItem, setIsCreatingNewItem] = React.useState<boolean>(false);
  const [isReloadNeeded, setIsReloadNeeded] = React.useState<boolean>(false);

  const classes = useToDoItemListStyles();
  const match = useRouteMatch<IMatchParameters>();
  const category = React.useRef<Category>();

  React.useEffect(() => {
    loadTodos();
  }, [match.params.categoryId]);

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

    Promise.all([getToDosByKey(match.params.categoryId)]).then((result) => {
      setTodos(result[0]);
      setIsLoading(false);
      setIsReloadNeeded(false);

      // category.current = result[1];
      console.log(category.current);
    });
  };

  const onAddNewItem = () => {
    setIsCreatingNewItem(true);
  };

  const onSubmitNewItem = (text: string) => {
    setIsCreatingNewItem(false);
    if (!text) {
      return;
    }

    setIsLoading(true);
    createItem({
      name: text,
      categoryKey: match.params.categoryId,
      tags: [],
    }).then((newTodo) => {
      // // This isn't the best way to do this...this could cause some weird flickering,
      // // but its quick and easy and it ensures the server stays up to date with UI
      // setTodos([...todos, newTodo]);
      // loadTodos();
      setIsReloadNeeded(true);
    });
  };

  return (
    <Container className={isLoading ? classes.contentContainer_dataLoaded : classes.contentContainer_dataLoaded} disableGutters>
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
                category={props.currentCategory.displayName}
              />
            ))}
            {!isCreatingNewItem && <AddNewToDoItemButton onClick={onAddNewItem} />}
            {isCreatingNewItem && <CreatingNewToDoItem onSubmit={onSubmitNewItem} />}
          </>
        )}
      </Box>
      {isLoading && (
        <>
          <Typography>Please wait, data is loading...</Typography>
          <CircularProgress />
        </>
      )}
      {/* <DeveloperTools /> */}
    </Container>
  );
};

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export const ToDoItemList = connect(mapStateToProps)(ToDoItemListComponent);
