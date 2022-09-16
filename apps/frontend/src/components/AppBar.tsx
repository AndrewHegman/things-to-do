import { AppBar as MuiAppBar, styled, SxProps, Theme, Toolbar, Typography } from "@mui/material";
import React from "react";

interface IAppBarProps {
  title?: string;
  disableGutters?: boolean;
  toolbarSx?: SxProps<Theme>;
  leftLinkTitle?: string;
  onLeftLinkClick?: () => void;
  rightLinkTitle?: string;
  onRightLinkClick?: () => void;
}

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

export const AppBar: React.FC<React.PropsWithChildren<IAppBarProps>> = (props) => {
  const { toolbarSx, onLeftLinkClick, leftLinkTitle, onRightLinkClick, rightLinkTitle, title } = props;
  return (
    <>
      <MuiAppBar>
        <Toolbar sx={{ justifyContent: "center", ...toolbarSx }} disableGutters>
          {onLeftLinkClick && (
            <Typography sx={{ position: "absolute", left: "10px" }} onClick={onLeftLinkClick}>
              {leftLinkTitle}
            </Typography>
          )}
          <Typography fontSize={28}>{title || "Things to Do"}</Typography>
          {onRightLinkClick && (
            <Typography sx={{ position: "absolute", right: "10px" }} onClick={onRightLinkClick}>
              {rightLinkTitle}
            </Typography>
          )}
        </Toolbar>
      </MuiAppBar>
      <Offset sx={{ marginTop: "10px" }} />
    </>
  );
};
