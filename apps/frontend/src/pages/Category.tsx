import { Divider, Drawer, Fab, List, ListItem, ListItemButton, ListItemText, styled, TextField, Typography } from "@mui/material";
import { Tag as TagType, Thing as ThingType, useGetThingsByCategoryQuery } from "@ttd/graphql";
import React from "react";
import { useNavigate, useParams } from "react-router";
import { useStore } from "../store";
import { AppBar } from "../components/AppBar";
import { Thing } from "../components/Thing";
import { Modal } from "../store/modals";
import { PageWrapper } from "../components/PageWrapper";
import { Tag } from "../components/Tag";
import { Add, Search } from "@mui/icons-material";
import { CurrentCategoryContext } from "../currentCategoryContext";
import { ConfirmDeleteModal } from "../components/ConfirmDeleteDialog";

interface ICategoryProps {
  loading: boolean;
}

export const CategoryPage: React.FC<ICategoryProps> = (props) => {
  const navigate = useNavigate();
  const { setCurrentThing, currentCategory, openModal, closeModal } = useStore();

  const [searchText, setSearchText] = React.useState("");
  const [selectedTags, setSelectedTags] = React.useState<TagType[]>([]);
  const [searchBoxFocused, setSearchBoxFocused] = React.useState(false);
  const [showMoreDrawer, setShowMoreDrawer] = React.useState(false);

  const searchBoxRef = React.useRef<HTMLDivElement>(null);

  const getSelectableTags = () => {
    return currentCategory.tags.filter((tag) => selectedTags.findIndex((selectedTag) => selectedTag.id === tag.id) < 0) || [];
  };

  const onTagClick = (tag: TagType) => {
    setSelectedTags([...selectedTags, tag]);
    setSearchText("");
  };

  const removeSelectedTag = (tag: TagType) => {
    const tagIdx = selectedTags.findIndex((_tag) => _tag.id === tag.id);

    setSelectedTags([...selectedTags.slice(0, tagIdx), ...selectedTags.slice(tagIdx! + 1)]);
  };

  const onClickMore = (thing: ThingType) => {
    setCurrentThing(thing);
    setShowMoreDrawer(true);
  };

  const getSearchBarContent = () => {
    const tagsToShow = getSelectableTags().filter((tag) => tag.name.toLowerCase().includes(searchText.toLowerCase()));
    if (tagsToShow.length === 0) {
      return <Typography>No tags found!</Typography>;
    }
    return tagsToShow.map((tag, idx) => (
      <div key={tag.id} style={{ marginBottom: "10px" }} onClick={() => onTagClick(tag)}>
        <Typography>{tag.name}</Typography>
        <Divider sx={{ marginRight: "20px" }} />
      </div>
    ));
  };

  const getCategoryContent = () => {
    const thingsToShow =
      selectedTags.length > 0
        ? currentCategory.things.filter((thing) =>
            selectedTags.every((selectedTag) => thing.tags.findIndex((tag) => tag.id === selectedTag.id) >= 0)
          ) || []
        : currentCategory.things || [];
    if (thingsToShow.length === 0) {
      return <Typography>No things found!</Typography>;
    }
    return thingsToShow.map((thing, idx) => (
      <div key={thing.id} style={{ marginBottom: "10px" }}>
        <Thing thing={thing} onClickMore={() => onClickMore(thing)} />
        <Divider sx={{ marginRight: "20px" }} />
      </div>
    ));
  };

  const onBackClicked = () => {
    if (searchBoxFocused) {
      setSearchBoxFocused(false);
    } else {
      navigate("/");
    }
  };

  const deleteThing = () => {};

  return (
    <PageWrapper onFabClick={() => navigate("create")}>
      <ConfirmDeleteModal />
      <AppBar
        onLeftLinkClick={() => onBackClicked()}
        leftLinkTitle="Back"
        onRightLinkClick={searchBoxFocused ? () => setSearchBoxFocused(false) : undefined}
        rightLinkTitle="Done"
        title={currentCategory.name}
      />
      <div style={{ display: "flex", flexDirection: "column", marginLeft: "10px" }}>
        <TextField
          variant="outlined"
          size="small"
          sx={{ margin: "0 10px 15px 0", borderRadius: "15px", color: "primary.main" }}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onFocus={() => setSearchBoxFocused(true)}
          InputProps={{
            sx: { color: "primary.main" },
            startAdornment: (
              <>
                <Search sx={{ color: "primary.main" }} />
                {selectedTags.map((tag) => (
                  <Tag key={tag.id} tag={tag} color="primary.main" onClose={removeSelectedTag} />
                ))}
              </>
            ),
          }}
          ref={searchBoxRef}
        />

        {!searchBoxFocused && getCategoryContent()}

        {searchBoxFocused && getSearchBarContent()}
      </div>
      <Drawer open={showMoreDrawer} anchor={"bottom"} onClose={() => setShowMoreDrawer(false)}>
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary="Edit" onClick={() => navigate("create")} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText
                primary="Delete"
                sx={{ color: "error.main" }}
                onClick={() => {
                  setShowMoreDrawer(false);
                  openModal(Modal.ConfirmDelete);
                }}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </PageWrapper>
  );
};
