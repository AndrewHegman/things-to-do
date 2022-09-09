import { useQuery } from "@apollo/client";
import { Divider, styled, TextField, Typography } from "@mui/material";
import { Category, Tag as TagType, Thing as ThingType, useGetCategoryLazyQuery, useGetCategoryQuery } from "@ttd/graphql";
import React from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { useStore } from "../store";
import { AppBar } from "../components/AppBar";
import { Link } from "react-router-dom";
import { Thing } from "../components/Thing";
import { Modal } from "../store/modals";
import { PageWrapper } from "../components/PageWrapper";
import { Tag } from "../components/Tag";
import { Search } from "@mui/icons-material";

interface ICategoryProps {}

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

export const CategoryPage: React.FC<ICategoryProps> = (props) => {
  const { categoryId } = useParams();
  const { categories, openModal } = useStore();

  const [searchText, setSearchText] = React.useState("");
  const [selectedTags, setSelectedTags] = React.useState<TagType[]>([]);
  const [searchBoxFocused, setSearchBoxFocused] = React.useState(false);

  const [category, setCategory] = React.useState(categories.find((category) => category.id === categoryId));

  const navigate = useNavigate();
  const [getCategory, { loading, data, called, error }] = useGetCategoryLazyQuery({ variables: { categoryId: categoryId! } });

  const tags = React.useRef<TagType[] | undefined>();
  const searchBoxRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (category) {
      tags.current = category.things
        .map((thing) => thing.tags)
        .reduce((arr, tags) => {
          tags.forEach((tag) => !arr.find((_tag) => _tag.id === tag.id) && arr.push(tag));
          return arr;
        }, []);
    }
  }, [category]);

  React.useEffect(() => {
    if (!called && !category) {
      getCategory();
    }

    if (called) {
      // Request made, waiting for data
      if (loading) {
        openModal(Modal.Loading);
      }

      // Request made, received data
      if (!loading && data) {
        setCategory(data.category);
      }

      // Request made, got error or no data
      if (!loading && (error || !data)) {
        navigate("/error/not-found");
      }
    }
  }, [category, called, loading, error, data]);

  const getSelectableTags = () => {
    return tags.current?.filter((tag) => selectedTags.findIndex((selectedTag) => selectedTag.id === tag.id) < 0) || [];
  };

  const onTagClick = (tag: TagType) => {
    setSelectedTags([...selectedTags, tag]);
    setSearchText("");
  };

  const getFilteredThings = (): ThingType[] => {
    // category?.things.filter((thing) => selectedTags.every((selectedTag) => thing.tags.findIndex((tag) => tag.id === selectedTag.id)));

    return selectedTags.length > 0
      ? category?.things.filter((thing) =>
          selectedTags.every((selectedTag) => thing.tags.findIndex((tag) => tag.id === selectedTag.id) >= 0)
        ) || []
      : category?.things || [];
  };

  const removeSelectedTag = (tag: TagType) => {
    const tagIdx = selectedTags.findIndex((_tag) => _tag.id === tag.id);

    setSelectedTags([...selectedTags.slice(0, tagIdx), ...selectedTags.slice(tagIdx! + 1)]);
  };

  return (
    <PageWrapper>
      <AppBar>
        <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
          <Typography
            sx={{ position: "absolute", left: "10px" }}
            onClick={() => (searchBoxFocused ? setSearchBoxFocused(false) : navigate("/"))}
          >
            Back
          </Typography>
          <Typography>Things to Do</Typography>
          {searchBoxFocused && (
            <Typography sx={{ position: "absolute", right: "10px" }} onClick={() => setSearchBoxFocused(false)}>
              Done
            </Typography>
          )}
        </div>
      </AppBar>
      <div style={{ display: "flex", flexDirection: "column", marginLeft: "10px" }}>
        <TextField
          variant="outlined"
          size="small"
          sx={{ margin: "0 10px 15px 0", borderRadius: "15px" }}
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
              <Thing thing={thing} />
              {category?.things.length! > 1 && idx < category?.things!.length! - 1 ? (
                <Divider sx={{ marginRight: "20px" }} />
              ) : null}
            </div>
          ))}

        {searchBoxFocused &&
          getSelectableTags()
            .filter((tag) => tag.name.toLowerCase().includes(searchText.toLowerCase()))
            .map((tag, idx) => (
              <div key={tag.name} style={{ marginBottom: "10px" }} onClick={() => onTagClick(tag)}>
                <Typography>{tag.name}</Typography>
                {tags.current?.length! > 1 && idx < tags.current?.length! - 1 ? <Divider sx={{ marginRight: "20px" }} /> : null}
              </div>
            ))}
      </div>
    </PageWrapper>
  );
};
