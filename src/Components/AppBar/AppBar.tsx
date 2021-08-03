import React from "react";
import { AppBar as MuiAppBar } from "@material-ui/core";

export interface IAppBarProps {
  className?: string;
}

export const AppBar: React.FC<IAppBarProps> = (props) => {
  return <MuiAppBar {...props}>{props.children}</MuiAppBar>;
};
