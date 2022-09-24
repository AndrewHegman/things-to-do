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

export const ThingPage: React.FC<IThingPageProps> = (props) => {
  const navigate = useNavigate();
  const { categoryId } = useParams();
  const { thing } = props;

  const { currentCategory, tags, setTags, openModal, closeModal, setCurrentThing } = useStore();
  const [
    createTag,
    { data: createTagData, loading: createTagLoading, error: createTagError, called: createTagCalled, reset: createTagReset },
  ] = useCreateTagMutation();

  const [
    createThing,
    {
      data: createThingData,
      loading: createThingLoading,
      error: createThingError,
      called: createThingCalled,
      reset: createThingReset,
    },
  ] = useCreateThingMutation();

  const [
    updateThing,
    {
      data: updateThingData,
      loading: updateThingLoading,
      error: updateThingError,
      called: updateThingCalled,
      reset: updateThingReset,
    },
  ] = useUpdateThingMutation();

  const [description, setDescription] = React.useState(thing?.description || "");
  const [selectedTags, setSelectedTags] = React.useState<string[]>(thing?.tags.map((tag) => tag.id) || []);
  const [createNewTag, setCreateNewTag] = React.useState(false);
  const [showDuplicateTagError, setShowDuplicateTagError] = React.useState(false);
  const [name, setName] = React.useState(thing?.name || "");

  // if (!currentCategory) {
  //   return <Navigate to={`/category/${categoryId}`} />;
  // }

  const categoryTags = useMemo(
    () => (!tags || !currentCategory ? [] : tags.filter((tag) => tag.category.id === currentCategory.id)),
    [currentCategory, tags]
  );

  React.useEffect(() => {
    if (!createTagLoading && !createThingLoading && !updateThingLoading) {
      closeModal(Modal.Loading);
    } else {
      openModal(Modal.Loading);
    }
  }, [createTagLoading, updateThingLoading, createThingLoading, closeModal, openModal]);

  React.useEffect(() => {
    if (!createTagLoading) {
      if (createTagData && createTagCalled) {
        setTags([...tags, createTagData.createTag]);
        setSelectedTags([...selectedTags, createTagData.createTag.id]);
        setCreateNewTag(false);

        createTagReset();
      }
    }
  }, [createTagLoading, setTags, setSelectedTags, createTagCalled, createTagData, createTagReset]);

  React.useEffect(() => {
    if (!createThingLoading) {
      if (createThingData && createThingCalled) {
        navigate("../");
        createThingReset();
      }
    }
  }, [createThingLoading, createThingCalled, createThingData, createThingReset, navigate]);

  React.useEffect(() => {
    if (!updateThingLoading) {
      if (updateThingData && updateThingCalled) {
        navigate("../");
        updateThingReset();
      }
    }
  });

  const onTagClick = (tag: TagType) => {
    const idx = selectedTags.findIndex((tagId) => tagId === tag.id);
    if (idx > -1) {
      setSelectedTags(removeFromArray(selectedTags, idx));
    } else {
      setSelectedTags([...selectedTags, tag.id]);
    }
  };

  const onNewTagBlur = (newTagName: string) => {
    if (categoryTags.findIndex((categoryTag) => categoryTag.name === newTagName) != -1) {
      setShowDuplicateTagError(true);
    } else if (newTagName && categoryTags.findIndex((categoryTag) => categoryTag.name === newTagName) === -1) {
      setShowDuplicateTagError(false);
      createTag({ variables: { category: currentCategory!.id, name: newTagName } });
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
          category: currentCategory!.id!,
        },
      });
    } else {
      createThing({
        variables: { description, name, tags: selectedTags, category: currentCategory!.id! },
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

  const onBackClicked = () => {
    setCurrentThing(null);
    navigate("../");
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
          error={description.length > 255}
        />
        <Typography
          sx={{ alignSelf: "flex-end", color: description.length > 255 ? "error.main" : "primary.main" }}
        >{`${description.length} / 255`}</Typography>
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
