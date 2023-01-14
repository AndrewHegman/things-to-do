import { Add } from "@mui/icons-material";
import { Fab } from "@mui/material";
import { Category, CreateCategoryDocument } from "@ttd/graphql";
import React from "react";
import { CreateCategoryModal } from "./CreateCategoryDialog";
import { CreateTagModal } from "./CreateTagDialog";
import { LoadingModal } from "./LoadingModal";
import { CurrentCategoryContext } from "../currentCategoryContext";
import { useStore } from "../store";
import { Navigate, useLocation, useNavigate } from "react-router";
import { useParams } from "react-router";
interface IPageWrapperProps {
  onFabClick?: () => void;
  noRedirect?: boolean;
}

export const PageWrapper: React.FC<React.PropsWithChildren<IPageWrapperProps>> = (props) => {
  const { onFabClick, children, noRedirect } = props;
  const { categories, setCurrentCategory } = useStore();
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    if (!noRedirect) {
      const category = categories.find((category) => category.id === categoryId) || ({} as Category);

      if (!category.id) {
        navigate({ pathname: "/" });
      } else {
        setCurrentCategory(category);
      }
    }
  }, [categoryId, categories, location]);

  return (
    <>
      <LoadingModal />
      {props.children}
      {onFabClick && (
        <Fab color="secondary" sx={{ position: "fixed", right: "10px", bottom: "10px" }} onClick={() => onFabClick()}>
          <Add />
        </Fab>
      )}
    </>
  );
};
