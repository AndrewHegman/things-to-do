import React from "react";
import { AppBar, Button, Chip, Dialog, InputAdornment, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Tag } from "../Interface/Tags";
import { Search } from "@mui/icons-material";
import { selectors, useAppSelector } from "../Redux";
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

  const [tags, setTags] = React.useState<Tag[]>([]);
  const [isTagsLoading, setIsTagsLoading] = React.useState(false);
  const [createTag, setCreateTag] = React.useState("");
  const [searchText, setSearchText] = React.useState("");
  const [selectedTags, setSelectedTags] = React.useState<Tag[]>(props.selectedTags || []);

  const apiBuilder = new APIBuilder();
  const tagsUpdated = React.useRef(false);

  const { isOpen, onClose } = props;

  const getTags = async () => {
    setIsTagsLoading(true);
    setTags(await apiBuilder.tags().byCategory(category!.key).get().fetch());
    setIsTagsLoading(false);
  };

  const onTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSearchText(e.target.value);
  };

  const onTagClick = (tag: Tag) => {
    tagsUpdated.current = true;
    const idx = selectedTags.findIndex((selectedTag) => selectedTag.id === tag.id);
    if (idx === -1) {
      setSelectedTags([...selectedTags, tag]);
    } else {
      setSelectedTags([...selectedTags.slice(0, idx), ...selectedTags.slice(idx + 1)]);
    }
    setSearchText("");
  };

  const onCreateNewTag = async () => {
    tagsUpdated.current = true;
    const newTagId = await apiBuilder.tags().create({ name: searchText, category: category!.key }).fetch();
    setTags(await apiBuilder.tags().get().byCategory(category!.key).fetch());
    setSelectedTags([...selectedTags, newTagId]);
    setSearchText("");
  };

  const onSaveClick = () => {
    tagsUpdated.current = false;

    onClose(selectedTags);
    setSearchText("");
    setSelectedTags([]);
  };

  React.useEffect(() => {
    getTags();
  }, []);

  React.useEffect(() => {
    setSelectedTags(props.selectedTags || []);
  }, [props.selectedTags]);

  React.useEffect(() => {
    const matchingTags =
      searchText !== "" ? tags.filter((tag) => tag.name.toLowerCase().includes(searchText.toLowerCase())) : tags;
    setTags(matchingTags);
    setCreateTag(matchingTags.filter((tag) => tag.name === searchText).length ? "" : searchText);
  }, [searchText, tags]);

  return (
    <Dialog fullScreen open={isOpen} onClose={() => onClose(selectedTags)} TransitionComponent={Transition}>
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
            {tags.map((tag) => (
              <Chip
                key={tag.id}
                label={tag.name}
                sx={{ margin: "5px" }}
                onClick={() => onTagClick(tag)}
                variant={selectedTags.findIndex((_tag) => _tag.id === tag.id) === -1 ? "outlined" : "filled"}
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
