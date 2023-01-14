import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from "@mui/material";
import { useCreateTagMutation, useUpdateCategoryMutation } from "@ttd/graphql";
import React from "react";
import { useStore } from "../store";
import { Modal } from "../store/modals";

interface ICreateTagDialogProps {}

enum CreateTagErrors {
  None = "none",
  Duplicate = "duplicate",
  Empty = "empty",
  TooLong = "tooLong",
}

export const CreateTagModal: React.FC<ICreateTagDialogProps> = (props) => {
  const [name, setName] = React.useState("");
  const [error, setError] = React.useState<CreateTagErrors>(CreateTagErrors.None);
  const [createTag, {}] = useCreateTagMutation();
  const [updateCategory, {}] = useUpdateCategoryMutation();
  const { openModal, closeModal, modals, currentCategory } = useStore();

  const currentTags = React.useMemo(() => currentCategory.tags.map((tag) => tag.name) || [], [currentCategory.tags]);

  const onClose = () => {
    setName("");
    closeModal(Modal.CreateTag);
  };

  const onNameChange = (_name: string) => {
    if (_name === "") {
      setError(CreateTagErrors.Empty);
    } else if (currentTags.includes(_name)) {
      setError(CreateTagErrors.Duplicate);
    } else if (_name.length > 15) {
      setError(CreateTagErrors.TooLong);
    } else {
      setError(CreateTagErrors.None);
    }
    setName(_name);
  };

  const onCreateNewTag = async () => {
    openModal(Modal.Loading);
    const newTag = await createTag({
      variables: { name },
    });
    if (newTag.data) {
      await updateCategory({
        variables: { id: currentCategory.id, tags: [...currentCategory.tags.map((tag) => tag.id), newTag.data?.createTag.id] },
      });
    }
    closeModal(Modal.Loading);
    onClose();
  };

  return (
    <Dialog open={modals.includes(Modal.CreateTag)}>
      <DialogTitle component="h1">New Tag</DialogTitle>
      <DialogContent>
        <TextField variant="standard" placeholder="New tag" value={name} onChange={(e) => onNameChange(e.target.value)} />
        {error === CreateTagErrors.Duplicate && <Typography color={"error.main"}>Tags must be unique!</Typography>}
        {error === CreateTagErrors.TooLong && <Typography color={"error.main"}>Tags cannot exceed 10 characters!</Typography>}
        {error === CreateTagErrors.Empty && <Typography color={"error.main"}>Tags cannot be empty!</Typography>}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClose()}>Cancel</Button>
        <Button disabled={error !== CreateTagErrors.None} onClick={() => onCreateNewTag()}>
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};
