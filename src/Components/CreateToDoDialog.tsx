import React from "react";
import { AppBar, Button, Chip, Dialog, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { TagsDialog } from "./TagsDialog";
import { selectors, useAppDispatch, useAppSelector } from "../Redux";
import { APIBuilder } from "../API/urlBuilder";
import { getTransition } from "./Transition";
import { ToDoItem } from "../Interface/ToDoItem";

export interface ICreateToDoDialogProps {
  isOpen: boolean;
  onClose: (didUpdate: boolean) => void;
  existingToDo?: ToDoItem;
}

const Transition = getTransition("up");

export const CreateToDoDialog: React.FC<ICreateToDoDialogProps> = (props) => {
  const [isTagsDialogOpen, setIsTagsDialogOpen] = React.useState(false);
  const [name, setName] = React.useState(props.existingToDo?.name ?? "");
  const [tags, setTags] = React.useState(props.existingToDo?.tags ?? []);
  const { isOpen, onClose, existingToDo } = props;

  React.useEffect(() => {
    if (existingToDo) {
      const { tags, name } = existingToDo;
      if (name) {
        setName(name);
      }

      if (tags) {
        setTags(tags);
      }
    }
  }, [existingToDo]);

  const apiBuilder = new APIBuilder();

  const currentCategory = useAppSelector(selectors.categories.selectCurrentCategory);

  const createNewThing = async () => {
    await apiBuilder.toDoItems().create({ name, tags, categoryKey: currentCategory!.key }).fetch();
    onClose(true);
  };

  const updateThing = async () => {
    await apiBuilder.toDoItems().byId(existingToDo!.id).update({ name, tags }).fetch();
    onClose(true);
  };

  const handleRemoveChip = async (tagId: string) => {
    const idx = tags.findIndex((tag) => tag.id === tagId);
    setTags([...tags.slice(0, idx), ...tags.slice(idx + 1)]);
  };

  return (
    <>
      <Dialog fullScreen open={isOpen} onClose={() => onClose(false)} TransitionComponent={Transition}>
        <AppBar sx={{ position: "relative" }}>
          <Box sx={{ display: "flex", alignItems: "center", paddingLeft: "5px", justifyContent: "space-around" }}>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {props.existingToDo ? `Edit "${props.existingToDo.name}"` : `Create a new "${currentCategory!.displayName}" thing`}
            </Typography>
            <Button sx={{ color: "white" }} variant="text" onClick={() => onClose(false)}>
              <Typography variant="subtitle1" component="div" sx={{ flexGrow: 1, textTransform: "none" }}>
                Close
              </Typography>
            </Button>
          </Box>
        </AppBar>
        <Box sx={{ display: "flex", flexDirection: "column", paddingLeft: "5px", paddingRight: "5px" }}>
          <TextField
            label="Name"
            variant="standard"
            sx={{ paddingBottom: "15px" }}
            helperText="Maximum of 50 characters"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            // onBlur={(e) => dispatch(actions.toDoItems.updateNewToDoItem({ name: e.target.value }))}
          />
          <TextField
            disabled
            label="More information"
            variant="standard"
            multiline
            minRows={1}
            helperText="Maximum of 250 characters"
            fullWidth
          />
          <Button sx={{ textTransform: "none" }} onClick={() => setIsTagsDialogOpen(true)}>
            <b>Labels &gt;</b>
          </Button>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            {tags.map((tag) => (
              <Chip label={tag.name} key={tag.id} sx={{ margin: "5px" }} onDelete={() => handleRemoveChip(tag.id)} />
            ))}
          </Box>
        </Box>
        <Button
          sx={{ textTransform: "none", marginTop: "15px" }}
          variant="contained"
          onClick={() => (existingToDo ? updateThing() : createNewThing())}
        >
          {existingToDo ? "Update Thing" : "Create a New Thing"}
        </Button>
      </Dialog>
      <TagsDialog
        isOpen={isTagsDialogOpen}
        onClose={(newTags) => {
          setTags(newTags);
          setIsTagsDialogOpen(false);
        }}
        selectedTags={tags}
      />
    </>
  );
};
