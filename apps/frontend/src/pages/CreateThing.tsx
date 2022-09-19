import { TextField, Typography } from "@mui/material";
import { Tag as TagType, useCreateTagMutation } from "@ttd/graphql";
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
  const [createTag, { data, loading, error, called, reset }] = useCreateTagMutation();

  const [description, setDescription] = React.useState("");
  const [selectedTags, setSelectedTags] = React.useState<string[]>([]);
  const [createNewTag, setCreateNewTag] = React.useState(false);
  console.log(description.length > 5);

  // if (!currentCategory) {
  //   return <Navigate to={`/category/${categoryId}`} />;
  // }

  const categoryTags = useMemo(
    () => (!tags || !currentCategory ? [] : tags.filter((tag) => tag.category === currentCategory.id)),
    [currentCategory, tags]
  );

  React.useEffect(() => {
    if (!loading) {
      if (data && called) {
        setTags([...tags, data.createTag]);
        setSelectedTags([...selectedTags, data.createTag.id]);
        reset();
      }
      closeModal(Modal.Loading);
    } else {
      openModal(Modal.Loading);
    }
  }, [loading, openModal, closeModal, setTags, setSelectedTags, called, data, reset]);

  const onTagClick = (tag: TagType) => {
    const idx = selectedTags.findIndex((tagId) => tagId === tag.id);
    if (idx > -1) {
      setSelectedTags(removeFromArray(selectedTags, idx));
    } else {
      setSelectedTags([...selectedTags, tag.id]);
    }
  };

  const onNewTagBlur = (newTagName: string) => {
    if (newTagName) {
      createTag({ variables: { category: currentCategory!.id, name: newTagName } });
    }
    console.log(newTagName);
    setCreateNewTag(false);
  };

  return (
    <PageWrapper>
      <AppBar
        leftLinkTitle="Back"
        onLeftLinkClick={() => navigate("../")}
        title="Create new Thing"
        rightLinkTitle="Save"
        onRightLinkClick={() => {}}
      />
      <div style={{ display: "flex", flexDirection: "column", margin: "15px 25px 0 15px" }}>
        <TextField variant="standard" placeholder="Name" sx={{ marginBottom: "40px" }} />
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
      </div>
    </PageWrapper>
  );
};
