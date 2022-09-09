import { AppBar as MuiAppBar, styled, SxProps, Theme, Toolbar, Typography } from "@mui/material";
import React from "react";

interface IAppBarProps {
  title?: string;
  disableGutters?: boolean;
  toolbarSx?: SxProps<Theme>;
  onBackClicked?: () => void;
  onDoneClicked?: () => void;
}

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

export const AppBar: React.FC<React.PropsWithChildren<IAppBarProps>> = (props) => {
  const { toolbarSx, onBackClicked, onDoneClicked, title } = props;
  return (
    <>
      <MuiAppBar>
        <Toolbar sx={{ justifyContent: "center", ...toolbarSx }} disableGutters>
          {onBackClicked && (
            <Typography sx={{ position: "absolute", left: "10px" }} onClick={onBackClicked}>
              Back
            </Typography>
          )}
          <Typography fontSize={28}>{title || "Things to Do"}</Typography>
          {onDoneClicked && (
            <Typography sx={{ position: "absolute", right: "10px" }} onClick={onDoneClicked}>
              Done
            </Typography>
          )}
        </Toolbar>
      </MuiAppBar>
      <Offset sx={{ marginTop: "10px" }} />
    </>
  );
};
