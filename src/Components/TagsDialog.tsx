import React from "react";
import { AppBar, Button, Chip, Dialog, InputAdornment, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Tag } from "../Interface/Tags";
import { Search } from "@mui/icons-material";
import { selectors, useAppSelector } from "../Redux";
import { APIBuilder } from "../API/urlBuilder";
import { getTransition } from "./Transition";
import { AxiosError, AxiosResponse } from "axios";
export interface ICreateToDoDialogProps {
  isOpen: boolean;
  onClose: (tags: Tag[]) => void;
  selectedTags: Tag[];
}

const Transition = getTransition("up");

export const TagsDialog: React.FC<ICreateToDoDialogProps> = (props) => {
  const [tags, setTags] = React.useState<Tag[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [createTag, setCreateTag] = React.useState("");
  const [searchText, setSearchText] = React.useState("");
  const [selectedTags, setSelectedTags] = React.useState<Tag[]>(props.selectedTags || []);
  const category = useAppSelector(selectors.categories.selectCurrentCategory);

  const apiBuilder = new APIBuilder();
  const tagsUpdated = React.useRef(false);

  const { isOpen, onClose } = props;

  const onTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSearchText(e.target.value);
  };

  const onTagClick = (tag: Tag) => {
    tagsUpdated.current = true;
    const idx = selectedTags.findIndex((selectedTag) => selectedTag._id === tag._id);
    if (idx === -1) {
      setSelectedTags([...selectedTags, tag]);
    } else {
      setSelectedTags([...selectedTags.slice(0, idx), ...selectedTags.slice(idx + 1)]);
    }
    setSearchText("");
  };

  const onCreateNewTag = () => {
    tagsUpdated.current = true;

    apiBuilder
      .tags()
      .create({ name: searchText, category: category!._id })
      .fetch()
      .then((res: AxiosResponse<Tag>) => {
        setSelectedTags([...selectedTags, res.data]);
        setTags([...tags, res.data]);
      })
      .catch((err: AxiosError) => {
        if (err.isAxiosError) {
          console.log(err.message);
        }
      })
      .finally(() => setIsLoading(false));
    setSearchText("");
  };

  const onSaveClick = () => {
    tagsUpdated.current = false;

    onClose(selectedTags);
    setSearchText("");
    setSelectedTags([]);
  };

  React.useEffect(() => {
    setIsLoading(true);
    apiBuilder
      .tags()
      .byCategory(category!._id)
      .get()
      .fetch()
      .then((response: AxiosResponse<Tag[]>) => {
        setTags(response.data);
      })
      .catch((err: AxiosError) => {
        if (err.isAxiosError) {
          console.log(err.message);
        }
      })
      .finally(() => setIsLoading(false));

    setIsLoading(false);
  }, []);

  React.useEffect(() => {
    setSelectedTags(props.selectedTags || []);
  }, [props.selectedTags]);

  React.useEffect(() => {
    const matchingTags =
      searchText !== "" ? tags.filter((tag) => tag.name.toLowerCase().includes(searchText.toLowerCase())) : tags;
    setTags(matchingTags);
    setCreateTag(matchingTags.filter((tag) => tag.name === searchText).length ? "" : searchText);
  }, [searchText]);

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
          disabled={isLoading}
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
        {!isLoading ? (
          <>
            {tags.map((tag) => (
              <Chip
                key={tag._id}
                label={tag.name}
                sx={{ margin: "5px" }}
                onClick={() => onTagClick(tag)}
                variant={selectedTags.findIndex((_tag) => _tag._id === tag._id) === -1 ? "outlined" : "filled"}
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
