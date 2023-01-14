import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { CreateCategoryDocument, GetCategoriesDocument, useCreateCategoryMutation, Category } from "@ttd/graphql";
import React from "react";
import { useNavigate } from "react-router";
import { updateCategoryCache } from "../graphql";
import { useStore } from "../store";
import { Modal } from "../store/modals";

interface ICategoriesProps {}

export const CreateCategoryModal: React.FC<ICategoriesProps> = (props) => {
  const [name, setName] = React.useState("");

  const [createCategory, { data, loading: createCategoryLoading, error, called }] = useCreateCategoryMutation();
  const { categories, openModal, closeModal, modals } = useStore();
  const navigate = useNavigate();

  const onClose = (categoryIdToNavigateTo: string | null = null) => {
    setName("");
    closeModal(Modal.CreateCategory);

    if (categoryIdToNavigateTo) {
      navigate(`category/${categoryIdToNavigateTo}`);
    }
  };

  const onCreateNewCategory = async () => {
    if (name !== "" && !categories.map((category) => category.name).includes(name)) {
      const newCategory = await createCategory({
        variables: { name },
        update: updateCategoryCache,
      });
      onClose(newCategory.data?.createCategory.id || null);
    }
  };

  return (
    <Dialog open={modals.includes(Modal.CreateCategory)}>
      <DialogTitle component="h1">Create a New Category</DialogTitle>
      <DialogContent>
        <TextField variant="standard" placeholder="New category name" value={name} onChange={(e) => setName(e.target.value)} />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClose()} sx={{ color: "text.primary" }}>
          Cancel
        </Button>
        <Button onClick={onCreateNewCategory} sx={{ color: "secondary.main" }}>
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};
