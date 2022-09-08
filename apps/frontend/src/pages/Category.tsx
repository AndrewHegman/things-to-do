import { useQuery } from "@apollo/client";
import { styled, Typography } from "@mui/material";
import { Category, useGetCategoryQuery } from "@ttd/graphql";
import React from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { useStore } from "../store";
import { AppBar } from "../components/AppBar";
import { Link } from "react-router-dom";

interface ICategoryProps {}

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

export const CategoryPage: React.FC<ICategoryProps> = (props) => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const { categories } = useStore();

  const category = React.useRef<Category | undefined>(categories.find((category) => category.id === categoryId));

  if (!category) {
    navigate("/error/not-found");
  }

  return (
    <>
      <AppBar>
        <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
          <Typography sx={{ position: "absolute", left: "10px" }} onClick={() => navigate("/")}>
            Back
          </Typography>
          <Typography>Things to Do</Typography>
        </div>
      </AppBar>
      {category && <div>{category?.current!.name}</div>}
    </>
  );
};
