import { Divider, styled, Typography } from "@mui/material";
import React from "react";
import { AppBar } from "../components/AppBar";
import { CategoryItem } from "../components/CategoryItem";
import { PageWrapper } from "../components/PageWrapper";
import { useStore } from "../store";
import { Modal } from "../store/modals";

interface ICategoriesProps {
  loading: boolean;
}

export const Categories: React.FC<ICategoriesProps> = (props) => {
  const { categories } = useStore();
  const { loading } = props;

  return (
    <PageWrapper>
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
