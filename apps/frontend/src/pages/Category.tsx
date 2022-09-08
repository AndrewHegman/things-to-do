import { useQuery } from "@apollo/client";
import { Divider, styled, Typography } from "@mui/material";
import { Category, useGetCategoryLazyQuery, useGetCategoryQuery } from "@ttd/graphql";
import React from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { useStore } from "../store";
import { AppBar } from "../components/AppBar";
import { Link } from "react-router-dom";
import { Thing } from "../components/Thing";
import { Modal } from "../store/modals";
import { PageWrapper } from "../components/PageWrapper";

interface ICategoryProps {}

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

export const CategoryPage: React.FC<ICategoryProps> = (props) => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const { categories } = useStore();
  const [getCategory, { loading, error, data, called }] = useGetCategoryLazyQuery({ variables: { categoryId: categoryId! } });
  const { openModal } = useStore();

  const category = React.useRef<Category | undefined>(categories.find((category) => category.id === categoryId));

  React.useEffect(() => {
    console.log("here");

    if (!called && (!category || !category.current)) {
      getCategory();
    }

    if (called) {
      // Request made, waiting for data
      if (loading) {
        openModal(Modal.Loading);
      }

      // Request made, received data
      if (!loading && data) {
        category.current = data.category;
      }

      // Request made, got error or no data
      if (!loading && (error || !data)) {
        console.log(error);
        // navigate("/error/not-found");
      }
    }
  }, [category, called, loading, error, data]);

  return (
    <PageWrapper>
      <AppBar>
        <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
          <Typography sx={{ position: "absolute", left: "10px" }} onClick={() => navigate("/")}>
            Back
          </Typography>
          <Typography>Things to Do</Typography>
        </div>
      </AppBar>
      <div style={{ display: "flex", flexDirection: "column", marginLeft: "10px" }}>
        {category.current?.things.map((thing, idx) => (
          <div key={thing.id} style={{ marginBottom: "10px" }}>
            <Thing thing={thing} key={thing.id} />
            {category.current?.things!.length! > 1 && idx < category.current?.things!.length! - 1 ? (
              <Divider sx={{ marginRight: "20px" }} />
            ) : null}
          </div>
        ))}
      </div>
    </PageWrapper>
  );
};
