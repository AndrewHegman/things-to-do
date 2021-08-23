import { Chip } from "@material-ui/core";
import React from "react";
import { connect, ConnectedProps, useDispatch } from "react-redux";
import { tags as TagsAPI } from "../../API/tags";
import { actions } from "../../Redux";
import { RootState } from "../../Redux/Store/index";
import { InformationDialog } from "../Dialogs/InformationDialog";
import { InputDialog } from "../Dialogs/InputDialog";
import { LoadingDialog } from "../Dialogs/LoadingDialog";

interface IAddNewTagProps extends PropsFromRedux {}

enum Dialogs {
  IsLoading = 0,
  EnterTagName = 1,
  DuplicateNameError = 2,
  EmptyNameError = 3,
}

const mapStateToProps = (state: RootState) => ({
  isSlowMode: state.common.isSlowMode,
  slowModeTime: state.common.slowModeTime,
  tags: state.tags.tags,
});

const AddNewTagComponent: React.FC<IAddNewTagProps> = ({ isSlowMode, slowModeTime, tags }) => {
  const [currentDialogs, setCurrentDialogs] = React.useState<Dialogs[]>([]);

  const dispatch = useDispatch();

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

  const createNewTag = async (tagName: string) => {
    if (tags.find((tag) => tag.name === tagName)) {
      openDialogs([Dialogs.DuplicateNameError]);
      return;
    }

    if (tagName === "") {
      openDialogs([Dialogs.EmptyNameError]);
      return;
    }

    openDialogs([Dialogs.IsLoading]);
    dispatch(actions.tags.setTags(await TagsAPI.createTag(tagName, isSlowMode, slowModeTime)));
    closeDialogs([Dialogs.IsLoading, Dialogs.EnterTagName]);
  };

  return (
    <>
      <Chip label={"Add new..."} style={{ margin: "2px" }} onClick={() => openDialogs([Dialogs.EnterTagName])} />
      <InputDialog
        isOpen={currentDialogs.includes(Dialogs.EnterTagName)}
        title="New Tag"
        submitText="Create"
        cancelText="Cancel"
        onSubmit={createNewTag}
        onCancel={() => closeDialogs([Dialogs.EnterTagName])}
      />
      <InformationDialog
        isOpen={currentDialogs.includes(Dialogs.DuplicateNameError)}
        dialogText={"Tags must have a unique name. There already exists a tag with this name."}
        onClose={() => closeDialogs([Dialogs.DuplicateNameError])}
      />
      <InformationDialog
        isOpen={currentDialogs.includes(Dialogs.EmptyNameError)}
        dialogText={"Tags must have a valid, non-empty, unique name."}
        onClose={() => closeDialogs([Dialogs.EmptyNameError])}
      />
      <LoadingDialog isOpen={currentDialogs.includes(Dialogs.IsLoading)} />
    </>
  );
};

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
export const AddNewTag = connector(AddNewTagComponent);
