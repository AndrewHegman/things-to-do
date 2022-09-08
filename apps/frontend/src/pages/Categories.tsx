import { Divider, styled, Typography } from "@mui/material";
import { useGetCategoriesQuery } from "@ttd/graphql";
import React from "react";
import { AppBar } from "../components/AppBar";
import { CategoryItem } from "../components/CategoryItem";
import { PageWrapper } from "../components/PageWrapper";
import { useStore } from "../store";

interface ICategoriesProps {}

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

export const Categories: React.FC<ICategoriesProps> = (props) => {
  const { categories, setCategories } = useStore();
  // const { loading, error, data } = useGetCategoriesQuery();

  // React.useEffect(() => {
  //   if (!loading && data) {
  //     setCategories(data.categories);
  //   }
  // }, [loading, data, setCategories]);

  return (
    <PageWrapper>
      <AppBar>
        <Typography sx={{ width: "100%", display: "flex", justifyContent: "center" }} fontSize={28}>
          Things to Do
        </Typography>
      </AppBar>
      <Typography sx={{ marginLeft: "5px" }} fontSize={"32px"}>
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
