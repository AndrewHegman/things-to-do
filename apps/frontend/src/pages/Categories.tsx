import { useQuery } from "@apollo/client";
import { AppBar, Box, Divider, Paper, styled, Toolbar, Typography } from "@mui/material";
import { Category, GetCategoriesDocument, useGetCategoriesQuery } from "@ttd/graphql";
import React from "react";
import { CategoryItem } from "../components/CategoryItem";

interface ICategoriesProps {}

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

export const Categories: React.FC<ICategoriesProps> = (props) => {
  const [categories, setCategories] = React.useState<Category[]>([]);
  const { loading, error, data } = useGetCategoriesQuery();

  React.useEffect(() => {
    if (!loading && data) {
      setCategories(data.categories);
    }
  }, [loading, data]);

  return (
    <>
      <AppBar>
        <Toolbar>
          <Typography sx={{ width: "100%", display: "flex", justifyContent: "center" }} fontSize={28}>
            Things To Do
          </Typography>
        </Toolbar>
      </AppBar>
      <Offset sx={{ marginTop: "10px" }} />
      {categories.map((category, idx) => (
        <div key={category.id} style={{ margin: "0 10% 0 10%" }}>
          <CategoryItem category={category} />
          {categories.length > 1 && idx < categories.length - 1 ? <Divider /> : null}
        </div>
      ))}
    </>
  );
};
