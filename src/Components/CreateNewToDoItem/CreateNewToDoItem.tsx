import React from "react";
import { useMediaQuery } from "@material-ui/core";
import { CreateNewToDoItem as MobileCreateNewToDoItem } from "./Mobile";
import { ICreateNewToDoItemProps } from "./Common";

export const ToDoItemEntry: React.FC<ICreateNewToDoItemProps> = (props) => {
  const isNotMobile = useMediaQuery("(min-width: 600px)");

  if (isNotMobile) {
    <></>;
  }
  return <MobileCreateNewToDoItem {...props} />;
};
