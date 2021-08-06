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
import { InformationDialog } from "../InformationDialog/InformationDialog";
import { LoadingDialog } from "../LoadingDialog/LoadingDialog";
import { TypographyInput } from "../TypographyInput";
import { CreateToDoDrawer } from "../CreateToDoDrawer/CreateToDoDrawer";
import { Tag } from "../../Interface/Tags";
import { tags as TagsAPI } from "../../API/tags";

interface IToDoListItemProps extends PropsFromRedux {}

const mapStateToProps = (state: RootState) => {
  return {
    currentCategory: state.categories.currentCategory,
    isSlowMode: state.common.isSlowMode,
    slowModeTime: state.common.slowModeTime,
  };
};

enum Dialogs {
  DuplicateToDo = 0,
  IsLoading = 1,
}

const ToDoItemListComponent: React.FC<IToDoListItemProps> = (props) => {
  const [isCreatingNewItem, setIsCreatingNewItem] = React.useState<boolean>(false);
  const [currentDialogs, setCurrentDialogs] = React.useState<Dialogs[]>([]);
  const [tags, setTags] = React.useState<Tag[]>([]);

  const classes = useToDoItemListStyles();
  const dispatch = useDispatch();
  const selectCurrentToDos = useSelector(selectors.toDos.getCurrentToDos);
  const { categoryId } = useParams<IRouteParams>();

  React.useEffect(() => {
    const fetchToDosAndTags = async () => {
      openDialogs([Dialogs.IsLoading]);
      dispatch(actions.toDos.setToDos(await toDos.getToDosByCategoryKey(categoryId, props.isSlowMode, props.slowModeTime)));
      setTags(await TagsAPI.getAllTags(props.isSlowMode, props.slowModeTime));
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

  const onDelete = async (id: string) => {
    try {
      openDialogs([Dialogs.IsLoading]);
      const _toDos = await toDos.deleteItem(id, props.isSlowMode, props.slowModeTime);
      dispatch(actions.toDos.setToDos(_toDos));
      closeDialogs([Dialogs.IsLoading]);
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

    if (selectCurrentToDos.find((toDo) => toDo.name === text)) {
      openDialogs([Dialogs.DuplicateToDo]);
      return;
    }

    openDialogs([Dialogs.IsLoading]);
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
    closeDialogs([Dialogs.IsLoading]);
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
          {selectCurrentToDos.map((item, i) => (
            <ToDoItemEntry
              onEdit={() => onEdit(item.id)}
              onInfo={() => onInfo(item.id)}
              onDelete={() => onDelete(item.id)}
              isEditing={false}
              key={i}
              item={item}
              category={props.currentCategory.displayName}
              tags={item.tags.map((toDoTag) => tags.find((tag) => toDoTag === tag.id)?.name || "")}
            />
          ))}
          {!isCreatingNewItem && <AddNewToDoItemButton onClick={onAddNewItem} />}
          {/* {isCreatingNewItem && (
            <TypographyInput
              placeholder={"Enter name..."}
              clearTextOnFirstEnter
              onBlur={(text) => {
                // setIsEditingExisting(false);
                // onEdit(text);
                setIsCreatingNewItem(false);
              }}
              // ref={inputRef}
            />
          )} */}
          <CreateToDoDrawer isOpen={isCreatingNewItem} onClose={() => setIsCreatingNewItem(false)} />
        </Box>

        <DeveloperTools />
      </Container>
      <InformationDialog
        dialogText={"To-do items must have a unique name"}
        isOpen={currentDialogs.includes(Dialogs.DuplicateToDo)}
        onClose={() => closeDialogs([Dialogs.DuplicateToDo])}
      />
      <LoadingDialog isOpen={currentDialogs.includes(Dialogs.IsLoading)} dialogText={"Please wait..."} />
    </>
  );
};

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export const ToDoItemList = connector(ToDoItemListComponent);
