import { Chip } from "@material-ui/core";
import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { tags as TagsAPI } from "../../API/tags";
import { Tag as TagType } from "../../Interface/Tags";
import { RootState } from "../../Redux/Store/index";
import { ConfirmationDialog } from "../ConfirmationDialog/ConfirmationDialog";

interface ITagProps extends PropsFromRedux {
  tag: TagType;
}

enum Dialogs {
  IsLoading = 0,
  ConfirmDelete = 1,
}

const mapStateToProps = (state: RootState) => ({
  isSlowMode: state.common.isSlowMode,
  slowModeTime: state.common.slowModeTime,
});

export const TagComponent: React.FC<ITagProps> = ({ tag, isSlowMode, slowModeTime }) => {
  const [currentDialogs, setCurrentDialogs] = React.useState<Dialogs[]>([]);

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
      <Chip onDelete={() => openDialogs([Dialogs.ConfirmDelete])} label={tag.name} style={{ margin: "2px" }} />
      <ConfirmationDialog
        isOpen={currentDialogs.includes(Dialogs.ConfirmDelete)}
        onClose={() => closeDialogs([Dialogs.ConfirmDelete])}
        title="Delete?"
        text="Are you sure you want to delete?"
        onCancel={() => {
          closeDialogs([Dialogs.ConfirmDelete]);
        }}
        onConfirm={() => {
          closeDialogs([Dialogs.ConfirmDelete]);
          TagsAPI.deleteTag(tag.id, isSlowMode, slowModeTime);
        }}
      />
    </>
  );
};

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
export const Tag = connector(TagComponent);
