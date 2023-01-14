import { TextField, Typography } from "@mui/material";
import { Tag as TagType, Thing, useCreateThingMutation, useUpdateCategoryMutation, useUpdateThingMutation } from "@ttd/graphql";
import React from "react";
import { useNavigate, useParams } from "react-router";
import { AppBar } from "../components/AppBar";
import { CreateTagModal } from "../components/CreateTagDialog";
import { PageWrapper } from "../components/PageWrapper";
import { Tag } from "../components/Tag";
import { updateThingCache } from "../graphql";
import { useStore } from "../store";
import { Modal } from "../store/modals";
import { removeFromArray } from "../utils";

interface IThingPageProps {
  thing?: Thing;
}

const MAX_DESC_LEN = 20;

export const ThingPage: React.FC<IThingPageProps> = (props) => {
  const navigate = useNavigate();
  const { thing } = props;

  const { openModal, closeModal, setCurrentThing, currentCategory } = useStore();

  const [updateThing, updateThingReq] = useUpdateThingMutation();
  const [updateCategory, {}] = useUpdateCategoryMutation();
  const [createThing, createThingReq] = useCreateThingMutation({ update: updateThingCache });

  const [description, setDescription] = React.useState(thing?.description || "");
  const [selectedTags, setSelectedTags] = React.useState<string[]>(thing?.tags.map((tag) => tag.id) || []);
  const [name, setName] = React.useState(thing?.name || "");

  React.useEffect(() => {
    if (!createThingReq.loading && !updateThingReq.loading) {
      closeModal(Modal.Loading);
    } else {
      openModal(Modal.Loading);
    }
  }, [updateThingReq.loading, createThingReq.loading, closeModal, openModal]);

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
        setCurrentThing(null);
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

  const onSaveClicked = async () => {
    if (thing) {
      updateThing({
        variables: {
          id: thing.id,
          description: description || thing.description,
          name: name || thing.name,
          tags: selectedTags || thing.tags.map((tag) => tag.id),
        },
      });
    } else {
      const newThing = await createThing({ variables: { description, name, tags: selectedTags, category: currentCategory.id! } });
      if (newThing.data) {
        await updateCategory({
          variables: {
            id: currentCategory.id,
            things: [...currentCategory.things.map((thing) => thing.id), newThing.data.createThing.id],
          },
        });
      }
    }
  };

  return (
    <PageWrapper>
      <CreateTagModal />
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
          {description.length > MAX_DESC_LEN && (
            <Typography sx={{ color: "error.main" }}>Description cannot exceed 20 characters</Typography>
          )}
          <Typography
            sx={{ color: description.length > MAX_DESC_LEN ? "error.main" : "primary.main" }}
          >{`${description.length} / ${MAX_DESC_LEN}`}</Typography>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <Typography fontSize={24}>Tags</Typography>
          <Typography fontSize={20} onClick={() => openModal(Modal.CreateTag)}>
            + Add New
          </Typography>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {currentCategory.tags.map((tag) => (
            <Tag
              sx={{ marginLeft: "3px", marginRight: "3px", marginBottom: "5px" }}
              tag={tag}
              key={tag.id}
              onClick={() => onTagClick(tag)}
              active={selectedTags.includes(tag.id)}
            />
          ))}
        </div>
      </div>
    </PageWrapper>
  );
};
