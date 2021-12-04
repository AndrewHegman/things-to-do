import React from "react";
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import { actions, selectors, useAppDispatch, useAppSelector } from "../Redux";

export interface IAppBarProps {}

export const TTDAppBar: React.FC<IAppBarProps> = (props) => {
  const dispatch = useAppDispatch();
  const currentCategory = useAppSelector(selectors.categories.selectCurrentCategory);

  return (
    <AppBar sx={{ position: "relative" }}>
      <Toolbar>
        <IconButton size="large" edge="start" color="inherit" onClick={() => dispatch(actions.categoriesDialog.open())}>
          <MenuIcon />
        </IconButton>
        {currentCategory ? (
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {currentCategory.displayName}
          </Typography>
        ) : null}
      </Toolbar>
    </AppBar>
  );
};
