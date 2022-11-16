import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { CreateCategoryDocument, GetCategoriesDocument, useCreateCategoryMutation, Category } from "@ttd/graphql";
import React from "react";
import { useNavigate } from "react-router";
import { useStore } from "../store";
import { Modal } from "../store/modals";

interface ICategoriesProps {
  // loading: boolean;
}

export const CreateCategoryModal: React.FC<ICategoriesProps> = (props) => {
  const [name, setName] = React.useState("");

  const [createCategory, { data, loading: createCategoryLoading, error, called }] = useCreateCategoryMutation();
  const { categories, setCurrentCategory, openModal, closeModal, modals } = useStore();
  const navigate = useNavigate();

  const onClose = () => {
    setName("");
    closeModal(Modal.CreateCategory);
  };

  const onCreateNewCategory = async () => {
    if (name !== "" && !categories.map((category) => category.name).includes(name)) {
      await createCategory({
        variables: { name },
        update: (store, { data }) => {
          const oldCategories = store.readQuery<{ categories: Category[] }>({ query: GetCategoriesDocument })?.categories || [];
          store.writeQuery({
            query: GetCategoriesDocument,
            data: { categories: [...oldCategories, data?.createCategory] },
          });
        },
      });
      onClose();
    }
  };

  return (
    <Dialog open={modals.includes(Modal.CreateCategory)}>
      <DialogTitle component="h1">New Category</DialogTitle>
      <DialogContent>
        <TextField variant="standard" placeholder="New category" value={name} onChange={(e) => setName(e.target.value)} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onCreateNewCategory}>Create</Button>
      </DialogActions>
    </Dialog>
  );
};
