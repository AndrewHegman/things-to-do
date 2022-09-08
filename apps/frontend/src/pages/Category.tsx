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

interface ICategoryProps {}

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

export const CategoryPage: React.FC<ICategoryProps> = (props) => {
  const [searchText, setSearchText] = React.useState("");
  const [selectedTags, setSelectedTags] = React.useState<TagType[]>([]);
  const [searchBoxFocused, setSearchBoxFocused] = React.useState(false);

  const { categoryId } = useParams();
  const navigate = useNavigate();
  const { categories, openModal } = useStore();
  const [getCategory, { loading, error, data, called }] = useGetCategoryLazyQuery({ variables: { categoryId: categoryId! } });

  const category = React.useRef<Category | undefined>(categories.find((category) => category.id === categoryId));
  const tags = React.useRef<TagType[] | undefined>();
  const selectableTags = React.useRef<TagType[] | undefined>();
  const searchBoxRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    // TODO: Consider making GQL do this BS
    if (category.current) {
      tags.current = category.current?.things
        .map((thing) => thing.tags)
        .reduce((arr, tags) => {
          tags.forEach((tag) => !arr.find((_tag) => _tag.id === tag.id) && arr.push(tag));
          return arr;
        }, []);
      selectableTags.current = tags.current;
    }
  }, [category, category.current]);

  React.useEffect(() => {
    console.log("here");

    if (!called && (!category || !category.current)) {
      getCategory();
    }

    if (called) {
      // Request made, waiting for data
      if (loading) {
        openModal(Modal.Loading);
      }

      // Request made, received data
      if (!loading && data) {
        category.current = data.category;
      }

      // Request made, got error or no data
      if (!loading && (error || !data)) {
        console.log(error);
        // navigate("/error/not-found");
      }
    }
  }, [category, called, loading, error, data]);

  // React.useEffect(() => {
  //   setSearchBoxFocused(document.activeElement === searchBoxRef.current);
  // }, [document.activeElement]);

  const onTagClick = (tag: TagType) => {
    const tagIdx = selectableTags.current?.findIndex((_tag) => _tag.id === tag.id);

    selectableTags.current = [...selectableTags.current!.slice(0, tagIdx), ...selectableTags.current!.slice(tagIdx! + 1)];

    setSelectedTags([...selectedTags, tag]);
    setSearchText("");
  };

  const getFilteredThings = (): ThingType[] => {
    console.log("here");
    return selectedTags.length > 0
      ? category.current?.things.filter((thing) =>
          thing.tags.some((tag) => selectedTags.find((selectedTag) => selectedTag.id === tag.id))
        ) || []
      : category.current?.things || [];
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
            startAdornment: selectedTags.map((tag) => <Tag key={tag.id} tag={tag} sx={{ color: "primary.main" }} />),
          }}
          ref={searchBoxRef}
        />

        {!searchBoxFocused &&
          getFilteredThings().map((thing, idx) => (
            <div key={thing.id} style={{ marginBottom: "10px" }}>
              <Thing thing={thing} />
              {category.current?.things!.length! > 1 && idx < category.current?.things!.length! - 1 ? (
                <Divider sx={{ marginRight: "20px" }} />
              ) : null}
            </div>
          ))}

        {searchBoxFocused &&
          selectableTags.current
            ?.filter((tag) => tag.name.toLowerCase().includes(searchText.toLowerCase()))
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
