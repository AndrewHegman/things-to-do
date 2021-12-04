import React from "react";
import { AppBar, Button, Chip, Dialog, InputAdornment, Slide, TextField, Typography } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { Box } from "@mui/system";
import { tags as tagsApi } from "../API/tags";
import { Tag } from "../Interface/Tags";
import { Search } from "@mui/icons-material";
import { Category } from "../Interface/Category";
import { actions, selectors, useAppDispatch, useAppSelector } from "../Redux";
import { APIBuilder } from "../API/urlBuilder";

export interface ICreateToDoDialogProps {
  isOpen: boolean;
  onClose: (didUpdate: boolean) => void;
}

const Transition = React.forwardRef(function Transition(props: TransitionProps & { children: React.ReactElement }, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const TagsDialog: React.FC<ICreateToDoDialogProps> = (props) => {
  const category = useAppSelector(selectors.categories.selectCurrentCategory);
  const newToDoItem = useAppSelector(selectors.toDoItems.selectNewToDoItem);

  const [tags, setTags] = React.useState<Tag[]>();
  const [isTagsLoading, setIsTagsLoading] = React.useState(false);
  const [createTag, setCreateTag] = React.useState("");
  const [searchText, setSearchText] = React.useState("");
  const [selectedTags, setSelectedTags] = React.useState<string[]>(newToDoItem.tags.map((tag) => tag.id));

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
      actions.toDoItems.updateNewToDoItem({ tags: selectedTags.map((selectedTag) => allTags.current.find((tag) => tag.id === selectedTag)!) })
    );
    setSearchText("");
    setSelectedTags([]);
    tagsUpdated.current = false;
    onClose(false);
  };

  React.useEffect(() => {
    getTags();
  }, []);

  React.useEffect(() => {
    setSelectedTags(newToDoItem.tags.map((tag) => tag.id));
  }, [newToDoItem.tags]);

  React.useEffect(() => {
    const matchingTags =
      searchText !== "" ? allTags.current?.filter((tag) => tag.name.toLowerCase().includes(searchText.toLowerCase())) : allTags.current;
    setTags(matchingTags);
    setCreateTag(matchingTags.filter((tag) => tag.name === searchText).length ? "" : searchText);
  }, [searchText]);

  return (
    <Dialog fullScreen open={isOpen} onClose={() => onClose(false)} TransitionComponent={Transition}>
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
            {createTag ? <Chip label={searchText} sx={{ margin: "5px" }} onClick={() => onCreateNewTag()} variant="outlined" /> : null}
          </>
        ) : (
          <div>Loading tags...</div>
        )}
      </Box>
    </Dialog>
  );
};
