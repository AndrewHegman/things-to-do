import React from "react";
import { AppBar, Button, Chip, Dialog, InputAdornment, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Tag } from "../Interface/Tags";
import { Search } from "@mui/icons-material";
import { actions, selectors, useAppDispatch, useAppSelector } from "../Redux";
import { APIBuilder } from "../API/urlBuilder";
import { getTransition } from "./Transition";

export interface ICreateToDoDialogProps {
  isOpen: boolean;
  onClose: (tags: Tag[]) => void;
  selectedTags: Tag[];
}

const Transition = getTransition("up");

export const TagsDialog: React.FC<ICreateToDoDialogProps> = (props) => {
  const category = useAppSelector(selectors.categories.selectCurrentCategory);
  // const newToDoItem = useAppSelector(selectors.toDoItems.selectNewToDoItem);

  const [tags, setTags] = React.useState<Tag[]>();
  const [isTagsLoading, setIsTagsLoading] = React.useState(false);
  const [createTag, setCreateTag] = React.useState("");
  const [searchText, setSearchText] = React.useState("");
  const [selectedTags, setSelectedTags] = React.useState<string[]>(props.selectedTags.map((tag) => tag.id));

  const apiBuilder = new APIBuilder();
  const dispatch = useAppDispatch();
  const allTags = React.useRef<Tag[]>([]);
  const tagsUpdated = React.useRef(false);

  const { isOpen, onClose } = props;

  const getTags = async () => {
    setIsTagsLoading(true);
    const loadedTags = await apiBuilder.tags().byCategory(category!.key).get().fetch();
    console.log(loadedTags);
    allTags.current = loadedTags;
    setTags(loadedTags);
    setIsTagsLoading(false);
  };

  const onTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSearchText(e.target.value);
  };

  const onTagClick = (tagId: string) => {
    tagsUpdated.current = true;
    const idx = selectedTags.indexOf(tagId);
    if (idx === -1) {
      setSelectedTags([...selectedTags, tagId]);
    } else {
      setSelectedTags([...selectedTags.slice(0, idx), ...selectedTags.slice(idx + 1)]);
    }
    setSearchText("");
  };

  const onCreateNewTag = async () => {
    tagsUpdated.current = true;
    const newTagId = await apiBuilder.tags().create({ name: searchText, category: category!.key }).fetch();
    allTags.current = await apiBuilder.tags().get().byCategory(category!.key).fetch();
    setSelectedTags([...selectedTags, newTagId]);
    setSearchText("");
  };

  const onSaveClick = () => {
    dispatch(
      actions.toDoItems.updateNewToDoItem({
        tags: selectedTags.map((selectedTag) => allTags.current.find((tag) => tag.id === selectedTag)!),
      })
    );
    tagsUpdated.current = false;
    onClose(selectedTags.map((selectedTag) => allTags.current.find((tag) => tag.id === selectedTag)!));
    setSearchText("");
    setSelectedTags([]);
  };

  React.useEffect(() => {
    getTags();
  }, []);

  React.useEffect(() => {
    setSelectedTags(props.selectedTags.map((tag) => tag.id));
  }, [props.selectedTags]);

  React.useEffect(() => {
    const matchingTags =
      searchText !== ""
        ? allTags.current?.filter((tag) => tag.name.toLowerCase().includes(searchText.toLowerCase()))
        : allTags.current;
    setTags(matchingTags);
    setCreateTag(matchingTags.filter((tag) => tag.name === searchText).length ? "" : searchText);
  }, [searchText]);

  // const isTagSelected = (id: string) => {
  //   return selectedTags.includes(id) || existingSelectedTags?.map((tag) => tag.id).includes(id);
  // };

  return (
    <Dialog
      fullScreen
      open={isOpen}
      onClose={() => onClose(selectedTags.map((selectedTag) => allTags.current.find((tag) => tag.id === selectedTag)!))}
      TransitionComponent={Transition}
    >
      <AppBar sx={{ position: "relative" }}>
        <Box sx={{ display: "flex", alignItems: "center", paddingLeft: "5px", justifyContent: "space-around" }}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Choose tags
          </Typography>
          <Button sx={{ color: "white" }} variant="text" onClick={() => onSaveClick()}>
            <Typography variant="subtitle1" component="div" sx={{ flexGrow: 1, textTransform: "none" }}>
              {tagsUpdated.current ? "Save" : "Cancel"}
            </Typography>
          </Button>
        </Box>
      </AppBar>
      <Box sx={{ paddingLeft: "5px", paddingRight: "5px" }}>
        <TextField
          fullWidth
          value={searchText}
          disabled={isTagsLoading}
          onChange={onTextChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          variant="standard"
        />
      </Box>
      <Box>
        {!isTagsLoading ? (
          <>
            {tags?.map((tag) => (
              <Chip
                key={tag.id}
                label={tag.name}
                sx={{ margin: "5px" }}
                onClick={() => onTagClick(tag.id)}
                variant={selectedTags.includes(tag.id) ? "filled" : "outlined"}
              />
            ))}
            {createTag ? (
              <Chip label={searchText} sx={{ margin: "5px" }} onClick={() => onCreateNewTag()} variant="outlined" />
            ) : null}
          </>
        ) : (
          <div>Loading tags...</div>
        )}
      </Box>
    </Dialog>
  );
};
