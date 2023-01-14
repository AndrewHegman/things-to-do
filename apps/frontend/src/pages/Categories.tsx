import { Divider, Typography } from "@mui/material";
import React from "react";
import { AppBar } from "../components/AppBar";
import { CategoryItem } from "../components/CategoryItem";
import { CreateCategoryModal } from "../components/CreateCategoryDialog";
import { PageWrapper } from "../components/PageWrapper";
import { useStore } from "../store";
import { Modal } from "../store/modals";

interface ICategoriesProps {}

export const Categories: React.FC<ICategoriesProps> = (props) => {
  const { categories, openModal } = useStore();

  return (
    <PageWrapper onFabClick={() => openModal(Modal.CreateCategory)} noRedirect>
      <CreateCategoryModal />

      <AppBar />

      <Typography sx={{ marginLeft: "5px" }} fontSize={32}>
        Categories
      </Typography>
      {categories.map((category, idx) => (
        <div key={category.id} style={{ margin: "0 10% 0 10%" }}>
          <CategoryItem category={category} />
          {categories.length > 1 && idx < categories.length - 1 ? <Divider /> : null}
        </div>
      ))}
    </PageWrapper>
  );
};
