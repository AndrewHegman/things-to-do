import React from "react";
import { useStore } from "../store";
import { LoadingModal } from "./LoadingModal";

export const PageWrapper: React.FC<React.PropsWithChildren> = (props) => {
  const { modals, closeModal } = useStore();

  return (
    <>
      <LoadingModal />
      {props.children}
    </>
  );
};
