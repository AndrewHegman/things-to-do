import { Chip, ChipProps } from "@material-ui/core";
import React from "react";
import { connect, ConnectedProps, useDispatch } from "react-redux";
import { tags as TagsAPI } from "../../API/tags";
import { Tag as TagType } from "../../Interface/Tags";
import { actions } from "../../Redux";
import { RootState } from "../../Redux/Store/index";
import { ConfirmationDialog } from "../Dialogs/ConfirmationDialog";
import { LoadingDialog } from "../Dialogs/LoadingDialog";
import { useTagStyles } from "./Tag.styles";

interface ITagProps extends PropsFromRedux {
  tag: TagType;
  isSelected: boolean;
  onClick: () => void;
  deletable: boolean;
}

enum Dialogs {
  IsLoading = 0,
  ConfirmDelete = 1,
}

const mapStateToProps = (state: RootState) => ({
  isSlowMode: state.common.isSlowMode,
  slowModeTime: state.common.slowModeTime,
});

const TagComponent: React.FC<ITagProps> = ({ tag, isSlowMode, slowModeTime, isSelected, onClick, deletable }) => {
  const [currentDialogs, setCurrentDialogs] = React.useState<Dialogs[]>([]);
  const chipRef = React.useRef<HTMLDivElement>(null);
  const classes = useTagStyles({ isSelected });

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

  const deleteTag = async () => {
    openDialogs([Dialogs.IsLoading]);
    dispatch(actions.tags.setTags(await TagsAPI.deleteTag(tag.id, isSlowMode, slowModeTime)));
    closeDialogs([Dialogs.ConfirmDelete, Dialogs.IsLoading]);
  };

  const handleClick = () => {
    chipRef.current?.blur();
    onClick();
  };

  const chipProps: ChipProps = {
    label: tag.name,
    style: { margin: "2px" },
    color: "primary",
    onClick: () => handleClick(),
    ref: chipRef,
  };

  return (
    <>
      {deletable && <Chip {...chipProps} onDelete={() => openDialogs([Dialogs.ConfirmDelete])} />}
      {!deletable && <Chip {...chipProps} clickable={false} variant={isSelected ? "default" : "outlined"} />}
      <ConfirmationDialog
        isOpen={currentDialogs.includes(Dialogs.ConfirmDelete)}
        onClose={() => closeDialogs([Dialogs.ConfirmDelete])}
        title="Delete?"
        text="Are you sure you want to delete?"
        onCancel={() => {
          closeDialogs([Dialogs.ConfirmDelete]);
        }}
        onConfirm={() => deleteTag()}
      />
      <LoadingDialog isOpen={currentDialogs.includes(Dialogs.IsLoading)} />
    </>
  );
};

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
export const Tag = connector(TagComponent);
