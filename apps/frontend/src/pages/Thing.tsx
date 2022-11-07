import { TextField, Typography } from "@mui/material";
import {
  CreateThingDocument,
  Tag as TagType,
  Thing,
  useCreateTagMutation,
  useCreateThingMutation,
  useUpdateThingMutation,
} from "@ttd/graphql";
import React, { useMemo } from "react";
import { Navigate, useNavigate, useParams } from "react-router";
import { AppBar } from "../components/AppBar";
import { PageWrapper } from "../components/PageWrapper";
import { Tag } from "../components/Tag";
import { useStore } from "../store";
import { Modal } from "../store/modals";
import { removeFromArray } from "../utils";

interface IThingPageProps {
  thing?: Thing;
}

const MAX_DESC_LEN = 20;

export const ThingPage: React.FC<IThingPageProps> = (props) => {
  const navigate = useNavigate();
  const { categoryId } = useParams();
  const { thing } = props;

  const { currentCategory, tags, setTags, openModal, closeModal, setCurrentThing } = useStore();

  const [createTag, createTagReq] = useCreateTagMutation();
  const [createThing, createThingReq] = useCreateThingMutation();
  const [updateThing, updateThingReq] = useUpdateThingMutation();

  const [description, setDescription] = React.useState(thing?.description || "");
  const [selectedTags, setSelectedTags] = React.useState<string[]>(thing?.tags.map((tag) => tag.id) || []);
  const [createNewTag, setCreateNewTag] = React.useState(false);
  const [showDuplicateTagError, setShowDuplicateTagError] = React.useState(false);
  const [name, setName] = React.useState(thing?.name || "");

  const categoryTags = useMemo(
    () => (!tags || !currentCategory ? [] : tags.filter((tag) => tag.category.id === currentCategory.id)),
    [currentCategory, tags]
  );

  React.useEffect(() => {
    if (!createTagReq.loading && !createThingReq.loading && !updateThingReq.loading) {
      closeModal(Modal.Loading);
    } else {
      openModal(Modal.Loading);
    }
  }, [createTagReq.loading, updateThingReq.loading, createThingReq.loading, closeModal, openModal]);

  React.useEffect(() => {
    if (!createTagReq.loading) {
      if (createTagReq.data && createTagReq.called) {
        setTags([...tags, createTagReq.data.createTag]);
        setSelectedTags([...selectedTags, createTagReq.data.createTag.id]);
        setCreateNewTag(false);

        createTagReq.reset();
      }
    }
  }, [createTagReq.loading, setTags, setSelectedTags, createTagReq.called, createTagReq.data, createTagReq.reset]);

  React.useEffect(() => {
    if (!createThingReq.loading) {
      if (createThingReq.data && createThingReq.called) {
        navigate("../");
        createThingReq.reset();
      }
    }
  }, [createThingReq.loading, createThingReq.called, createThingReq.data, createThingReq.reset, navigate]);

  React.useEffect(() => {
    if (!updateThingReq.loading) {
      if (updateThingReq.data && updateThingReq.called) {
        navigate("../");
        updateThingReq.reset();
      }
    }
  }, [updateThingReq.loading, updateThingReq.called, updateThingReq.data, updateThingReq.reset, navigate]);

  const onTagClick = (tag: TagType) => {
    const idx = selectedTags.findIndex((tagId) => tagId === tag.id);
    if (idx > -1) {
      setSelectedTags(removeFromArray(selectedTags, idx));
    } else {
      setSelectedTags([...selectedTags, tag.id]);
    }
  };

  const onBackClicked = () => {
    setCurrentThing(null);
    navigate("../");
  };

  if (!currentCategory) {
    return <Navigate to={`/category/${categoryId}`} />;
  }

  const onNewTagBlur = (newTagName: string) => {
    if (categoryTags.findIndex((categoryTag) => categoryTag.name === newTagName) != -1) {
      setShowDuplicateTagError(true);
    } else if (newTagName && categoryTags.findIndex((categoryTag) => categoryTag.name === newTagName) === -1) {
      setShowDuplicateTagError(false);
      createTag({ variables: { category: currentCategory.id, name: newTagName } });
    } else {
      setCreateNewTag(false);
    }
  };

  const onSaveClicked = () => {
    if (thing) {
      updateThing({
        variables: {
          id: thing.id,
          description: description || thing.description,
          name: name || thing.name,
          tags: selectedTags || thing.tags.map((tag) => tag.id),
          category: currentCategory.id!,
        },
      });
    } else {
      createThing({
        variables: { description, name, tags: selectedTags, category: currentCategory.id! },
        update: (cache, { data }) => {
          cache.modify({
            fields: {
              things(existingThings = []) {
                const newThing = data?.createThing;
                cache.writeQuery({
                  query: CreateThingDocument,
                  data: { newThing, ...existingThings },
                });
              },
            },
          });
        },
      });
    }
  };

  return (
    <PageWrapper>
      <AppBar
        leftLinkTitle="Back"
        onLeftLinkClick={onBackClicked}
        title="Create new Thing"
        rightLinkTitle="Save"
        onRightLinkClick={onSaveClicked}
      />
      <div style={{ display: "flex", flexDirection: "column", margin: "15px 25px 0 15px" }}>
        <TextField
          variant="standard"
          placeholder="Name"
          sx={{ marginBottom: "40px" }}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          variant="outlined"
          placeholder="Description"
          multiline
          sx={{ borderRadius: "6px" }}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          error={description.length > MAX_DESC_LEN}
        />
        <div style={{ display: "flex", justifyContent: description.length > MAX_DESC_LEN ? "space-between" : "flex-end" }}>
          {description.length > MAX_DESC_LEN && <Typography sx={{ color: "error.main" }}>This is error text?</Typography>}
          <Typography
            sx={{ color: description.length > MAX_DESC_LEN ? "error.main" : "primary.main" }}
          >{`${description.length} / ${MAX_DESC_LEN}`}</Typography>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <Typography fontSize={24}>Tags</Typography>
          <Typography fontSize={20} onClick={() => setCreateNewTag(true)}>
            + Add New
          </Typography>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {categoryTags.map((tag) => (
            <Tag
              sx={{ marginLeft: "3px", marginRight: "3px", marginBottom: "5px" }}
              tag={tag}
              key={tag.id}
              onClick={() => onTagClick(tag)}
              active={selectedTags.includes(tag.id)}
            />
          ))}
          {createNewTag && (
            <Tag creating tag="" sx={{ marginLeft: "3px", marginRight: "3px", marginBottom: "5px" }} onBlur={onNewTagBlur} />
          )}
        </div>
        {showDuplicateTagError && <Typography color={"error.main"}>Tags must be unique!</Typography>}
      </div>
    </PageWrapper>
  );
};
