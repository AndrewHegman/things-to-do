import { AppBar as MuiAppBar, styled, Toolbar, Typography } from "@mui/material";
import React from "react";

interface IAppBarProps {}

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

export const AppBar: React.FC<React.PropsWithChildren<IAppBarProps>> = (props) => {
  return (
    <>
      <MuiAppBar>
        <Toolbar>{props.children}</Toolbar>
      </MuiAppBar>
      <Offset sx={{ marginTop: "10px" }} />
    </>
  );
};
