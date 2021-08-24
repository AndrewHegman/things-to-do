import { Button, Divider } from "@material-ui/core";
import React from "react";
import { connect, ConnectedProps, useDispatch, useSelector } from "react-redux";
import { tags as TagsAPI } from "../../API/tags";
import { RootState } from "../../Redux/Store/index";
import { AppBar } from "../AppBar/AppBar";
import { Dialog } from "../Dialog/Dialog";
import { LoadingDialog } from "../Dialogs/LoadingDialog";
import { TypographyInput } from "../TypographyInput";
import { useCreateToDoDrawerStyles } from "./CreateToDoDrawer.styles";
import { Tag as TagComponent } from "../Tag/Tag";
import { actions, selectors } from "../../Redux";
import { AddNewTag } from "../Tag/AddNewTag";
import { toDos } from "../../API/toDos";
import { InformationDialog } from "../Dialogs/InformationDialog";
import { Tag } from "../../Interface/Tags";

interface ICreateToDoDrawerProps extends PropsFromRedux {
  isOpen: boolean;
  onClose: () => void;
}

enum Dialogs {
  IsLoading = 0,
  DuplicateToDo = 1,
  BlankToDo = 2,
}

const mapStateToProps = (state: RootState) => ({
  isSlowMode: state.common.isSlowMode,
  slowModeTime: state.common.slowModeTime,
  tags: state.tags.tags,
  currentCategory: state.categories.currentCategory,
});

const CreateToDoDrawerComponent: React.FC<ICreateToDoDrawerProps> = (props) => {
  const [currentDialogs, setCurrentDialogs] = React.useState<Dialogs[]>([]);
  const [selectedTags, setSelectedTags] = React.useState<Tag[]>([]);
  const [toDoName, setToDoName] = React.useState<string>("");
  const [tagSearchText, setTagSearchText] = React.useState<string>("");
  const [visibleTags, setVisibleTags] = React.useState<Tag[]>([]);

  const classes = useCreateToDoDrawerStyles();
  const dispatch = useDispatch();
  const selectCurrentToDos = useSelector(selectors.toDos.getCurrentToDos);

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

  const handleTagClick = (tag: Tag) => {
    const idx = selectedTags.findIndex((selectedTag) => selectedTag.id === tag.id);
    if (idx > -1) {
      setSelectedTags([...selectedTags.slice(0, idx), ...selectedTags.slice(idx + 1)]);
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const onSubmit = async () => {
    if (toDoName === "") {
      openDialogs([Dialogs.BlankToDo]);
      return;
    }

    if (selectCurrentToDos.find((toDo) => toDo.name === toDoName)) {
      openDialogs([Dialogs.DuplicateToDo]);
      return;
    }

    openDialogs([Dialogs.IsLoading]);
    dispatch(
      actions.toDos.setToDos(
        await toDos.createItem(
          {
            categoryKey: props.currentCategory.key,
            name: toDoName,
            tags: selectedTags.map((tag) => tag.id),
          },
          props.isSlowMode,
          props.slowModeTime
        )
      )
    );

    closeDialogs([Dialogs.IsLoading]);
    props.onClose();
  };

  React.useEffect(() => {
    let matchingTags: Tag[];
    if (tagSearchText === "") {
      matchingTags = selectedTags;
    } else {
      let exact = false;
      matchingTags = props.tags.filter((tag) => {
        if (tag.name === tagSearchText) {
          exact = true;
        }
        return tag.name.includes(tagSearchText) || selectedTags.find((selectedTag) => selectedTag.id === tag.id);
      });
      if (!exact) {
        matchingTags.push({ id: null as unknown as string, name: tagSearchText });
      }
    }
    setVisibleTags(matchingTags);
  }, [props.tags, tagSearchText, selectedTags]);

  React.useEffect(() => {
    return () => {
      setToDoName("");
      setSelectedTags([]);
    };
  }, []);

  React.useEffect(() => {
    const loadTags = async () => {
      openDialogs([Dialogs.IsLoading]);
      dispatch(actions.tags.setTags(await TagsAPI.getAllTags(props.isSlowMode, props.slowModeTime)));
      closeDialogs([Dialogs.IsLoading]);
    };
    loadTags();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <>
      <Dialog isOpen={props.isOpen} onClose={props.onClose} direction={"up"}>
        <AppBar className={classes.dialogAppBar}>
          <Button onClick={props.onClose} color="inherit">
            close
          </Button>
        </AppBar>
        <div className={classes.contentContainer}>
          <TypographyInput clearTextOnFirstEnter placeholder={"New to-do name..."} onChange={(text) => setToDoName(text)} />
          <Divider />
          <div className={classes.tagContainer}>
            <TypographyInput
              clearTextOnFirstEnter
              placeholder={"Add some tags!"}
              onChange={(text) => setTagSearchText(text)}
            />
            {visibleTags.map((tag) => {
              if (tag.id === null) {
                return <AddNewTag label={tag.name} />;
              }
              return (
                <TagComponent
                  tag={tag}
                  key={tag.id}
                  isSelected={!!selectedTags.find((selectedTag) => selectedTag.id === tag.id)}
                  onClick={() => handleTagClick(tag)}
                  deletable={false}
                />
              );
            })}
          </div>
          <Button
            style={{ alignSelf: "center" }}
            variant="contained"
            fullWidth={false}
            color="primary"
            disableRipple
            onClick={onSubmit}
          >
            Submit
          </Button>
        </div>
      </Dialog>
      <LoadingDialog isOpen={currentDialogs.includes(Dialogs.IsLoading)} />
      <InformationDialog
        isOpen={currentDialogs.includes(Dialogs.DuplicateToDo)}
        onClose={() => closeDialogs([Dialogs.DuplicateToDo])}
        title={"Invalid Name"}
        dialogText={"ToDo's must have a unique name"}
      />
      <InformationDialog
        isOpen={currentDialogs.includes(Dialogs.BlankToDo)}
        onClose={() => closeDialogs([Dialogs.BlankToDo])}
        title={"Missing Name"}
        dialogText={"ToDo's must have a name"}
      />
    </>
  );
};

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
export const CreateToDoDrawer = connector(CreateToDoDrawerComponent);
