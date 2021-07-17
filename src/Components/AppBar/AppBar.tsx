import React from "react";
import { AppBar as MuiAppBar } from "@material-ui/core";
import { useAppBarStyles } from "./AppBar.styles";

export interface IAppBarProps {
  className?: string;
}

export const AppBar: React.FC<IAppBarProps> = (props) => {
  const classes = useAppBarStyles();

  return <MuiAppBar {...props}>{props.children}</MuiAppBar>;
};
