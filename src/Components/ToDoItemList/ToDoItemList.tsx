import React from "react";
import { Container, Box, Dialog, DialogContent, DialogContentText, Typography, CircularProgress } from "@material-ui/core";
import { ToDoItemEntry } from "../ToDoItem/ToDoItem";
import { useToDoItemListStyles } from "./ToDoItemList.styles";
import { ToDoItem } from "../../Interface/ToDoItem";
import { CreateNewToDoItem } from "../CreateNewToDoItem/Mobile";
import { AddNewToDoItemButton } from "../AddNewToDoItemButton/AddNewToDoItemButton";
import { CreatingNewToDoItem } from "../ToDoItem/Mobile";
import { Category } from "../../Interface/Category";
import { useRouteMatch } from "react-router";
import { IMatchParameters } from "../../Interface/Router";
import { connect, ConnectedProps, useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { actions, selectors } from "../../Redux";
import { DeveloperTools } from "../DeveloperTools";

interface IToDoListItemProps extends PropsFromRedux {}

const mapStateToProps = (state: RootState) => {
  return {
    isLoading: state.categories.isCategoriesLoading,
    currentCategory: state.categories.currentCategory,
  };
};

export const ToDoItemListComponent: React.FC<IToDoListItemProps> = (props) => {
  const [isCreatingNewItem, setIsCreatingNewItem] = React.useState<boolean>(false);

  const classes = useToDoItemListStyles();
  const dispatch = useDispatch();
  const selectCurrentToDos = useSelector(selectors.toDos.getCurrentToDos);

  const onEdit = (id: string) => {
    console.log(`edit ${id}`);
  };
  const onInfo = (id: string) => {
    console.log(`info ${id}`);
  };
  const onDelete = (id: string) => {
    dispatch(actions.toDos.deleteToDo(id));
  };

  const onAddNewItem = () => {
    setIsCreatingNewItem(true);
  };

  const onSubmitNewItem = (text: string) => {
    setIsCreatingNewItem(false);
    if (!text) {
      return;
    }

    dispatch(
      actions.toDos.createToDo({
        name: text,
        categoryKey: props.currentCategory.key,
        tags: [],
      })
    );
  };

  return (
    <Container className={props.isLoading ? classes.contentContainer_dataLoaded : classes.contentContainer_dataLoaded} disableGutters>
      <Box>
        {!props.isLoading && (
          <>
            {selectCurrentToDos.map((item, i) => (
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
      {props.isLoading && (
        <>
          <Typography>Please wait, data is loading...</Typography>
          <CircularProgress />
        </>
      )}
      <DeveloperTools />
    </Container>
  );
};

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export const ToDoItemList = connector(ToDoItemListComponent);
