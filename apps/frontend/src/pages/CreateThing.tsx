import { TextField, Typography } from "@mui/material";
import { Tag as TagType, useCreateTagMutation, useCreateThingMutation } from "@ttd/graphql";
import React, { useMemo } from "react";
import { Navigate, useNavigate, useParams } from "react-router";
import { AppBar } from "../components/AppBar";
import { PageWrapper } from "../components/PageWrapper";
import { Tag } from "../components/Tag";
import { useStore } from "../store";
import { Modal } from "../store/modals";
import { removeFromArray } from "../utils";

export const CreateThing: React.FC = () => {
  const navigate = useNavigate();
  const { categoryId } = useParams();
  const { currentCategory, tags, setTags, openModal, closeModal } = useStore();
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

  const [description, setDescription] = React.useState("");
  const [selectedTags, setSelectedTags] = React.useState<string[]>([]);
  const [createNewTag, setCreateNewTag] = React.useState(false);
  const [showDuplicateTagError, setShowDuplicateTagError] = React.useState(false);
  const [name, setName] = React.useState("");

  // if (!currentCategory) {
  //   return <Navigate to={`/category/${categoryId}`} />;
  // }

  const categoryTags = useMemo(
    () => (!tags || !currentCategory ? [] : tags.filter((tag) => tag.category.id === currentCategory.id)),
    [currentCategory, tags]
  );

  React.useEffect(() => {
    if (!createTagLoading) {
      if (createTagData && createTagCalled) {
        setTags([...tags, createTagData.createTag]);
        setSelectedTags([...selectedTags, createTagData.createTag.id]);
        setCreateNewTag(false);

        createTagReset();
      }
      closeModal(Modal.Loading);
    } else {
      openModal(Modal.Loading);
    }
  }, [createTagLoading, openModal, closeModal, setTags, setSelectedTags, createTagCalled, createTagData, createTagReset]);

  React.useEffect(() => {
    if (!createThingLoading) {
      if (createThingData && createThingCalled) {
        navigate("../");
        createThingReset();
      }
      closeModal(Modal.Loading);
    } else {
      openModal(Modal.Loading);
    }
  }, [createThingLoading, openModal, closeModal, createThingCalled, createThingData, createThingReset]);

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
    createThing({ variables: { description, name, tags: selectedTags, category: currentCategory!.id! } });
  };

  return (
    <PageWrapper>
      <AppBar
        leftLinkTitle="Back"
        onLeftLinkClick={() => navigate("../")}
        title="Create new Thing"
        rightLinkTitle="Save"
        onRightLinkClick={() => onSaveClicked()}
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
