import { Button, Chip, Divider } from "@material-ui/core";
import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { tags as TagsAPI } from "../../API/tags";
import { Tag } from "../../Interface/Tags";
import { RootState } from "../../Redux/Store/index";
import { AppBar } from "../AppBar/AppBar";
import { ConfirmationDialog } from "../ConfirmationDialog/ConfirmationDialog";
import { Dialog } from "../Dialog/Dialog";
import { LoadingDialog } from "../LoadingDialog/LoadingDialog";
import { TypographyInput } from "../TypographyInput";
import { useCreateToDoDrawerStyles } from "./CreateToDoDrawer.styles";
import { Tag as TagComponent } from "../Tag/Tag";

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
});

const CreateToDoDrawerComponent: React.FC<ICreateToDoDrawerProps> = (props) => {
  const [currentDialogs, setCurrentDialogs] = React.useState<Dialogs[]>([]);
  const [tags, setTags] = React.useState<Tag[]>([]);

  const classes = useCreateToDoDrawerStyles();

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

  React.useEffect(() => {
    const loadTags = async () => {
      openDialogs([Dialogs.IsLoading]);
      setTags(await TagsAPI.getAllTags(props.isSlowMode, props.slowModeTime));
      closeDialogs([Dialogs.IsLoading]);
    };
    loadTags();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Dialog isOpen={props.isOpen} onClose={props.onClose} direction={"up"}>
        <AppBar className={classes.dialogAppBar}>
          <Button onClick={props.onClose} color="inherit">
            close
          </Button>
        </AppBar>
        <div className={classes.contentContainer}>
          <TypographyInput clearTextOnFirstEnter placeholder={"New to-do name..."} />
          <Divider />
          <div className={classes.tagContainer}>
            {tags.map((tag) => (
              <TagComponent tag={tag} />
            ))}
          </div>
        </div>
      </Dialog>
      <LoadingDialog isOpen={currentDialogs.includes(Dialogs.IsLoading)} />
    </>
  );
};

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
export const CreateToDoDrawer = connector(CreateToDoDrawerComponent);
