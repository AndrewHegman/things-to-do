import { Add } from "@mui/icons-material";
import { Fab } from "@mui/material";
import { CreateCategoryDocument } from "@ttd/graphql";
import React from "react";
import { CreateCategoryModal } from "./CreateCategoryDialog";
import { LoadingModal } from "./LoadingModal";

interface IPageWrapperProps {
  onFabClick?: () => void;
}

export const PageWrapper: React.FC<React.PropsWithChildren<IPageWrapperProps>> = (props) => {
  const { onFabClick, children } = props;
  return (
    <>
      <LoadingModal />
      <CreateCategoryModal />
      {props.children}
      {onFabClick && (
        <Fab color="secondary" sx={{ position: "fixed", right: "10px", bottom: "10px" }} onClick={() => onFabClick()}>
          <Add />
        </Fab>
      )}
    </>
  );
};
