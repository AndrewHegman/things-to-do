import React from "react";
import { useMediaQuery } from "@material-ui/core";
import { ToDoItem as MobileToDoItem } from "./Mobile";
import { ToDoItem as DesktopToDoItem } from "./Desktop";
import { IToDoItemProps } from "./Common";

export const ToDoItemEntry: React.FC<IToDoItemProps> = (props) => {
  const isNotMobile = useMediaQuery("(min-width: 600px)");

  if (isNotMobile) {
    return <DesktopToDoItem {...props} />;
  }
  return <MobileToDoItem {...props} />;
};
