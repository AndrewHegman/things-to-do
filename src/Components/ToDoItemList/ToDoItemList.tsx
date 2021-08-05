import React from "react";
import { Container, Box, Typography, CircularProgress } from "@material-ui/core";
import { ToDoItemEntry } from "../ToDoItem/ToDoItem";
import { useToDoItemListStyles } from "./ToDoItemList.styles";
import { AddNewToDoItemButton } from "../AddNewToDoItemButton/AddNewToDoItemButton";
import { CreatingNewToDoItem } from "../ToDoItem/Mobile";
import { connect, ConnectedProps, useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { actions, selectors } from "../../Redux";
import { DeveloperTools } from "../DeveloperTools";
import { toDos } from "../../API/toDos";
import { useParams } from "react-router";
import { IRouteParams } from "../../Interface/Router";

interface IToDoListItemProps extends PropsFromRedux {}

const mapStateToProps = (state: RootState) => {
  return {
    currentCategory: state.categories.currentCategory,
    isSlowMode: state.common.isSlowMode,
    slowModeTime: state.common.slowModeTime,
  };
};

const ToDoItemListComponent: React.FC<IToDoListItemProps> = (props) => {
  const [isCreatingNewItem, setIsCreatingNewItem] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const classes = useToDoItemListStyles();
  const dispatch = useDispatch();
  const selectCurrentToDos = useSelector(selectors.toDos.getCurrentToDos);
  const { categoryId } = useParams<IRouteParams>();

  React.useEffect(() => {
    const fetchToDos = async () => {
      setIsLoading(true);
      const _toDos = await toDos.getToDosByCategoryKey(categoryId, props.isSlowMode, props.slowModeTime);
      dispatch(actions.toDos.setToDos(_toDos));
      setIsLoading(false);
    };
    fetchToDos();
    // Don't re-run hook if isSlowMode or slowModeTime change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId, dispatch]);

  const onEdit = (id: string) => {
    console.log(`edit ${id}`);
  };
  const onInfo = (id: string) => {
    console.log(`info ${id}`);
  };
  const onDelete = async (id: string) => {
    try {
      setIsLoading(true);
      const _toDos = await toDos.deleteItem(id, props.isSlowMode, props.slowModeTime);
      dispatch(actions.toDos.setToDos(_toDos));
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const onAddNewItem = () => {
    setIsCreatingNewItem(true);
  };

  const onSubmitNewItem = async (text: string) => {
    setIsCreatingNewItem(false);
    if (!text) {
      return;
    }

    setIsLoading(true);
    const _toDos = await toDos.createItem(
      {
        name: text,
        categoryKey: props.currentCategory.key,
        tags: [],
      },
      props.isSlowMode,
      props.slowModeTime
    );

    dispatch(actions.toDos.setToDos(_toDos));
    setIsLoading(false);
  };

  return (
    <Container
      className={isLoading ? classes.contentContainer_dataLoaded : classes.contentContainer_dataLoaded}
      disableGutters
    >
      <Box>
        {!isLoading && (
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
      {isLoading && (
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
