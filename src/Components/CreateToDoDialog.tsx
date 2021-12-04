import React from "react";
import { AppBar, Button, Chip, Dialog, Slide, TextField, Typography } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { Box } from "@mui/system";
import { TagsDialog } from "./TagsDialog";
import { Category } from "../Interface/Category";
import { actions, selectors, useAppDispatch, useAppSelector } from "../Redux";
import { toDos as ToDosApi } from "../API/toDos";
import { APIBuilder } from "../API/urlBuilder";
export interface ICreateToDoDialogProps {
  isOpen: boolean;
  onClose: (didUpdate: boolean) => void;
}

const Transition = React.forwardRef(function Transition(props: TransitionProps & { children: React.ReactElement }, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const CreateToDoDialog: React.FC<ICreateToDoDialogProps> = (props) => {
  const [isTagsDialogOpen, setIsTagsDialogOpen] = React.useState(false);
  const apiBuilder = new APIBuilder();

  const { isOpen, onClose } = props;

  const newToDo = useAppSelector(selectors.toDoItems.selectNewToDoItem);
  const currentCategory = useAppSelector(selectors.categories.selectCurrentCategory);
  const dispatch = useAppDispatch();

  const createNewThing = async () => {
    await apiBuilder
      .toDoItems()
      .create({ ...newToDo, categoryKey: currentCategory!.key })
      .fetch();
    dispatch(actions.toDoItems.clearNewToDoItem());
    onClose(true);
  };

  const handleRemoveChip = async (tagId: string) => {
    dispatch(actions.toDoItems.removeTagFromNewToDoItem(tagId));
  };

  return (
    <>
      <Dialog fullScreen open={isOpen} onClose={() => onClose(false)} TransitionComponent={Transition}>
        <AppBar sx={{ position: "relative" }}>
          <Box sx={{ display: "flex", alignItems: "center", paddingLeft: "5px", justifyContent: "space-around" }}>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Create a new "{currentCategory!.displayName}" thing
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
            onBlur={(e) => dispatch(actions.toDoItems.updateNewToDoItem({ name: e.target.value }))}
          />
          <TextField disabled label="More information" variant="standard" multiline minRows={1} helperText="Maximum of 250 characters" fullWidth />
          <Button sx={{ textTransform: "none" }} onClick={() => setIsTagsDialogOpen(true)}>
            <b>Labels &gt;</b>
          </Button>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            {newToDo.tags.map((tag) => (
              <Chip label={tag.name} key={tag.id} sx={{ margin: "5px" }} onDelete={() => handleRemoveChip(tag.id)} />
            ))}
          </Box>
        </Box>
        <Button sx={{ textTransform: "none", marginTop: "15px" }} variant="contained" onClick={() => createNewThing()}>
          Create a New Thing
        </Button>
      </Dialog>
      <TagsDialog isOpen={isTagsDialogOpen} onClose={() => setIsTagsDialogOpen(false)} />
    </>
  );
};
