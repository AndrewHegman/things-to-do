import React from "react";
import { useNavigate, useParams } from "react-router";
import { AppBar } from "../components/AppBar";
import { PageWrapper } from "../components/PageWrapper";
import { useStore } from "../store";

export const CreateThing: React.FC = () => {
  const navigate = useNavigate();
  const { categoryId } = useParams();
  const { currentCategory } = useStore();

  React.useEffect(() => {
    if (!currentCategory) {
      navigate(`/category/${categoryId}`);
    }
  }, []);

  return (
    <PageWrapper>
      <AppBar onBackClicked={() => navigate("../")} title="Create new Thing" />
    </PageWrapper>
  );
};
