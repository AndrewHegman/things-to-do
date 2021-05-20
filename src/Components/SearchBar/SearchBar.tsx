import React from "react";
import { InputBase } from "@material-ui/core";
import { Search as SearchIcon } from "@material-ui/icons";
import { useSearchBarStyles } from "./SearchBar.styles";

interface ISearchBarProps {}

export const SearchBar: React.FC<ISearchBarProps> = (props) => {
  const classes = useSearchBarStyles();
  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        placeholder="Search…"
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        inputProps={{ "aria-label": "search" }}
      />
    </div>
  );
};
