import React from "react";
import { useMediaQuery } from "@material-ui/core";
import { Dialog as MobileDialog } from "./Mobile";
import { IBaseDialogProps } from "./Common";

export const Dialog: React.FC<IBaseDialogProps> = (props) => {
  const isNotMobile = useMediaQuery("(min-width: 600px)");

  if (isNotMobile) {
    <></>;
  }
  return <MobileDialog {...props} />;
};
