import { Divider, Drawer, Fab, List, ListItem, ListItemButton, ListItemText, styled, TextField, Typography } from "@mui/material";
import { Tag as TagType, Thing as ThingType, useGetCategoryLazyQuery } from "@ttd/graphql";
import React from "react";
import { useNavigate, useParams } from "react-router";
import { useStore } from "../store";
import { AppBar } from "../components/AppBar";
import { Thing } from "../components/Thing";
import { Modal } from "../store/modals";
import { PageWrapper } from "../components/PageWrapper";
import { Tag } from "../components/Tag";
import { Add, Search } from "@mui/icons-material";

interface ICategoryProps {
  loading: boolean;
}

export const CategoryPage: React.FC<ICategoryProps> = (props) => {
  const { loading } = props;
  const { categoryId } = useParams();
  const { categories, openModal, currentCategory, setCurrentCategory, closeModal, tags, things, setCurrentThing } = useStore();

  const [searchText, setSearchText] = React.useState("");
  const [selectedTags, setSelectedTags] = React.useState<TagType[]>([]);
  const [searchBoxFocused, setSearchBoxFocused] = React.useState(false);
  const [showMoreDrawer, setShowMoreDrawer] = React.useState(false);

  const navigate = useNavigate();

  const searchBoxRef = React.useRef<HTMLDivElement>(null);

  const categoryTags = React.useMemo(
    () => (!tags || !currentCategory ? [] : tags.filter((tag) => currentCategory?.id === tag.category.id)),
    [tags, currentCategory]
  );

  const categoryThings = React.useMemo(
    () => (!things || !currentCategory ? [] : things.filter((thing) => currentCategory.id === thing.category.id)),
    [things, currentCategory]
  );

  React.useEffect(() => {
    if (loading) {
      openModal(Modal.Loading);
    } else {
      closeModal(Modal.Loading);
    }
  }, [loading]);

  React.useEffect(() => {
    if (categories && !loading) {
      const _currentCategory = categories.find((category) => category.id === categoryId);
      if (!_currentCategory) {
        navigate("/error/not-found");
      } else {
        setCurrentCategory(_currentCategory);
      }
    }
  }, [categories, categoryId, loading]);

  const getSelectableTags = () => {
    return categoryTags.filter((tag) => selectedTags.findIndex((selectedTag) => selectedTag.id === tag.id) < 0) || [];
  };

  const onTagClick = (tag: TagType) => {
    setSelectedTags([...selectedTags, tag]);
    setSearchText("");
  };

  const getFilteredThings = (): ThingType[] => {
    return selectedTags.length > 0
      ? categoryThings.filter((thing) =>
          selectedTags.every((selectedTag) => thing.tags.findIndex((tag) => tag.id === selectedTag.id) >= 0)
        ) || []
      : categoryThings || [];
  };

  const removeSelectedTag = (tag: TagType) => {
    const tagIdx = selectedTags.findIndex((_tag) => _tag.id === tag.id);

    setSelectedTags([...selectedTags.slice(0, tagIdx), ...selectedTags.slice(tagIdx! + 1)]);
  };

  const onClickMore = (thing: ThingType) => {
    setCurrentThing(thing);
    setShowMoreDrawer(true);
  };

  return (
    <PageWrapper>
      <AppBar
        onLeftLinkClick={() => (searchBoxFocused ? setSearchBoxFocused(false) : navigate("/"))}
        leftLinkTitle="Back"
        onRightLinkClick={searchBoxFocused ? () => setSearchBoxFocused(false) : undefined}
        rightLinkTitle="Done"
        title={currentCategory?.name}
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
            startAdornment: (
              <>
                <Search sx={{ color: "primary.main" }} />
                {selectedTags.map((tag) => (
                  <Tag key={tag.id} tag={tag} sx={{ color: "primary.main" }} onClose={removeSelectedTag} />
                ))}
              </>
            ),
          }}
          ref={searchBoxRef}
        />

        {!searchBoxFocused &&
          getFilteredThings().map((thing, idx) => (
            <div key={thing.id} style={{ marginBottom: "10px" }}>
              <Thing thing={thing} onClickMore={() => onClickMore(thing)} />
              {categoryThings.length! > 1 && idx < categoryThings!.length! - 1 ? <Divider sx={{ marginRight: "20px" }} /> : null}
            </div>
          ))}

        {searchBoxFocused &&
          getSelectableTags()
            .filter((tag) => tag.name.toLowerCase().includes(searchText.toLowerCase()))
            .map((tag, idx) => (
              <div key={tag.name} style={{ marginBottom: "10px" }} onClick={() => onTagClick(tag)}>
                <Typography>{tag.name}</Typography>
                {categoryTags.length > 1 && idx < categoryTags.length - 1 ? <Divider sx={{ marginRight: "20px" }} /> : null}
              </div>
            ))}
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
              <ListItemText primary="Delete" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <Fab color="secondary" sx={{ position: "fixed", right: "10px", bottom: "10px" }} onClick={() => navigate("create")}>
        <Add />
      </Fab>
    </PageWrapper>
  );
};
