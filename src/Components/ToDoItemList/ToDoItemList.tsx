import React from "react";
import { Container, Box } from "@material-ui/core";
import { ToDoItemEntry } from "../ToDoItem/ToDoItem";
import { useToDoItemListStyles } from "./ToDoItemList.styles";
import { AddNewToDoItemButton } from "../AddNewToDoItemButton/AddNewToDoItemButton";
import { connect, ConnectedProps, useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { actions, selectors } from "../../Redux";
import { DeveloperTools } from "../DeveloperTools";
import { toDos } from "../../API/toDos";
import { useParams } from "react-router";
import { IRouteParams } from "../../Interface/Router";
import { LoadingDialog } from "../Dialogs/LoadingDialog";
import { CreateToDoDrawer } from "../CreateToDoDrawer/CreateToDoDrawer";
import { Tag } from "../../Interface/Tags";
import { tags as TagsAPI } from "../../API/tags";
import { InformationDialog } from "../Dialogs/InformationDialog";
import { ConfirmationDialog } from "../Dialogs/ConfirmationDialog";
import { ToDoItem } from "../../Interface/ToDoItem";

interface IToDoListItemProps extends PropsFromRedux {}

const mapStateToProps = (state: RootState) => {
  return {
    currentCategory: state.categories.currentCategory,
    isSlowMode: state.common.isSlowMode,
    slowModeTime: state.common.slowModeTime,
    selectedTags: state.tags.selectedTags,
  };
};

enum Dialogs {
  IsLoading = 0,
  NetworkError = 1,
  ConfirmDelete = 2,
}

const ToDoItemListComponent: React.FC<IToDoListItemProps> = (props) => {
  const [isCreatingNewItem, setIsCreatingNewItem] = React.useState<boolean>(false);
  const [currentDialogs, setCurrentDialogs] = React.useState<Dialogs[]>([]);
  const [tags, setTags] = React.useState<Tag[]>([]);

  const classes = useToDoItemListStyles();
  const dispatch = useDispatch();
  const selectCurrentToDos = useSelector(selectors.toDos.getCurrentToDos);
  const networkError = React.useRef<string>("");
  const selectedToDo = React.useRef<ToDoItem>();

  const { categoryId } = useParams<IRouteParams>();

  React.useEffect(() => {
    const fetchToDosAndTags = async () => {
      openDialogs([Dialogs.IsLoading]);
      const _tags = await TagsAPI.getAllTags(props.isSlowMode, props.slowModeTime);
      setTags(_tags);
      dispatch(actions.toDos.setToDos(await toDos.getToDosByCategoryKey(categoryId, props.isSlowMode, props.slowModeTime)));
      closeDialogs([Dialogs.IsLoading]);
    };
    fetchToDosAndTags();
    // Don't re-run hook if isSlowMode or slowModeTime change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId, dispatch]);

  const onEdit = (id: string) => {
    console.log(`edit ${id}`);
  };

  const onInfo = (id: string) => {
    console.log(`info ${id}`);
  };

  const onDelete = async () => {
    if (!selectedToDo.current) {
      console.error("Unable to delete ToDo. selectedToDo ref is undefined.");
      return;
    }
    try {
      openDialogs([Dialogs.IsLoading]);
      dispatch(
        actions.toDos.setToDos(await toDos.deleteItem(selectedToDo.current.id, props.isSlowMode, props.slowModeTime))
      );
    } catch (error: any) {
      // TODO: Test this
      networkError.current = error;
      openDialogs([Dialogs.NetworkError]);
    }
    closeDialogs([Dialogs.IsLoading, Dialogs.ConfirmDelete, Dialogs.NetworkError]);
  };

  const onAddNewItem = () => {
    setIsCreatingNewItem(true);
  };

  const closeDialogs = (dialogsToClose: Dialogs[]) => {
    setCurrentDialogs(currentDialogs.filter((dialog) => !dialogsToClose.includes(dialog)));
  };

  const openDialogs = (dialogsToOpen: Dialogs[]) => {
    dialogsToOpen.forEach((dialog) => {
      if (!currentDialogs.includes(dialog)) {
        setCurrentDialogs([...currentDialogs, dialog]);
      }
    });
  };

  const getToDoItems = () => {
    const { selectedTags } = props;
    if (selectedTags.length === 0) {
      return selectCurrentToDos;
    }
    return selectCurrentToDos.filter((toDoItem) => selectedTags.some((tag) => toDoItem.tags.includes(tag.id)));
  };

  return (
    <>
      <Container
        className={
          currentDialogs.includes(Dialogs.IsLoading)
            ? classes.contentContainer_dataLoaded
            : classes.contentContainer_dataLoaded
        }
        disableGutters
      >
        <Box>
          {getToDoItems().map((item, i) => (
            <ToDoItemEntry
              onEdit={() => onEdit(item.id)}
              onInfo={() => onInfo(item.id)}
              onDelete={() => {
                selectedToDo.current = item;
                openDialogs([Dialogs.ConfirmDelete]);
              }}
              isEditing={false}
              key={i}
              item={item}
              category={props.currentCategory.displayName}
              tags={item.tags.map((tag) => tags.find((_tag) => _tag.id === tag)).filter((tag) => tag !== undefined) as Tag[]}
            />
          ))}
          {!isCreatingNewItem && <AddNewToDoItemButton onClick={onAddNewItem} />}
          <CreateToDoDrawer isOpen={isCreatingNewItem} onClose={() => setIsCreatingNewItem(false)} />
        </Box>

        <DeveloperTools />
      </Container>
      <LoadingDialog isOpen={currentDialogs.includes(Dialogs.IsLoading)} dialogText={"Please wait..."} />
      <InformationDialog
        isOpen={currentDialogs.includes(Dialogs.NetworkError)}
        dialogText={networkError.current}
        title={"Network Error"}
      />
      <ConfirmationDialog
        isOpen={currentDialogs.includes(Dialogs.ConfirmDelete)}
        text="Are you sure you want to delete the ToDo?"
        onCancel={() => closeDialogs([Dialogs.ConfirmDelete])}
        onClose={() => closeDialogs([Dialogs.ConfirmDelete])}
        title="Delete ToDo?"
        onConfirm={() => onDelete()}
      />
    </>
  );
};

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export const ToDoItemList = connector(ToDoItemListComponent);
