import { Divider, styled, Typography } from "@mui/material";
import { CreateCategoryDocument, useCreateCategoryMutation } from "@ttd/graphql";
import React from "react";
import { useNavigate } from "react-router";
import { AppBar } from "../components/AppBar";
import { CategoryItem } from "../components/CategoryItem";
import { PageWrapper } from "../components/PageWrapper";
import { useStore } from "../store";
import { Modal } from "../store/modals";

interface ICategoriesProps {
  loading: boolean;
}

export const Categories: React.FC<ICategoriesProps> = (props) => {
  const [isCreatingCategory, setIsCreatingCategory] = React.useState(false);
  const [createCategory, { data, loading: createCategoryLoading, error, called, reset }] = useCreateCategoryMutation();
  const { categories, setCurrentCategory, openModal, closeModal, setCategories } = useStore();
  const navigate = useNavigate();

  const onNewCategoryBlur = (newCategoryName: string) => {
    if (!newCategoryName) {
      setIsCreatingCategory(false);
    } else {
      createCategory({
        variables: { name: newCategoryName },
        update: (cache, { data }) => {
          cache.modify({
            fields: {
              things(existingThings = []) {
                const newThing = data?.createCategory;
                console.log(data);
                cache.writeQuery({
                  query: CreateCategoryDocument,
                  data: { newThing, ...existingThings },
                });
              },
            },
          });
        },
      });
    }
  };

  React.useEffect(() => {
    createCategoryLoading ? openModal(Modal.Loading) : closeModal(Modal.Loading);

    if (!createCategoryLoading && called && data) {
      navigate(`category/${data.createCategory.id}`);
      setCategories([...categories, data.createCategory]);
      setCurrentCategory(data.createCategory);
    }
  }, [createCategoryLoading, called, data]);

  return (
    <PageWrapper onFabClick={() => setIsCreatingCategory(true)}>
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
      {isCreatingCategory && (
        <div style={{ margin: "0 10% 0 10%" }}>
          <Divider />
          <CategoryItem creating onBlur={onNewCategoryBlur} />
        </div>
      )}
    </PageWrapper>
  );
};
