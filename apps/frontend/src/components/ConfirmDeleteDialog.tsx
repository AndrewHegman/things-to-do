import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from "@mui/material";
import { Category, useCreateTagMutation, useDeleteThingMutation, useUpdateCategoryMutation } from "@ttd/graphql";
import React from "react";
import { CurrentCategoryContext } from "../currentCategoryContext";
import { updateCategoryCache } from "../graphql";
import { useStore } from "../store";
import { Modal } from "../store/modals";

interface ICreateTagDialogProps {}

enum CreateTagErrors {
  None = "none",
  Duplicate = "duplicate",
  Empty = "empty",
  TooLong = "tooLong",
}

export const ConfirmDeleteModal: React.FC<ICreateTagDialogProps> = (props) => {
  const [deleteThing, {}] = useDeleteThingMutation();
  const [updateCategory, {}] = useUpdateCategoryMutation();
  const { currentThing, currentCategory, openModal, closeModal, modals, setCurrentThing } = useStore();

  if (!currentThing?.id) {
    return <></>;
  }

  const onClose = () => {
    closeModal(Modal.ConfirmDelete);
  };

  const onDeleteThing = async () => {
    openModal(Modal.Loading);
    const deletedThingId = (
      await deleteThing({
        variables: { id: currentThing.id },
      })
    ).data?.deleteThing;

    if (deletedThingId) {
      await updateCategory({
        variables: {
          id: currentCategory.id,
          things: currentCategory.things.filter((thing) => thing.id !== deletedThingId).map((thing) => thing.id),
        },
      });
    }
    setCurrentThing(null);
    closeModal(Modal.Loading);
    onClose();
  };

  return (
    <Dialog open={modals.includes(Modal.ConfirmDelete)}>
      <DialogTitle component="h1">Delete {currentThing.name} </DialogTitle>
      <DialogContent>
        <Typography>
          Are you sure you want to delete <b>{currentThing.name}</b>? This cannot be undone.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClose()} sx={{ color: "text.primary" }}>
          Cancel
        </Button>
        <Button onClick={() => onDeleteThing()} sx={{ color: "error.main" }}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};
