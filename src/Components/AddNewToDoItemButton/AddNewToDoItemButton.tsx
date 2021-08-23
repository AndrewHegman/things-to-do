import React from "react";
import { Typography } from "@material-ui/core";
import { useAddNewToDoItemButtonStyles } from "./AddNewToDoItemButton.styles";

interface IAddNewToDoItemButtonProps {
  onClick: () => void;
}

export const AddNewToDoItemButton: React.FC<IAddNewToDoItemButtonProps> = (props) => {
  const classes = useAddNewToDoItemButtonStyles();

  const handleClick = () => {
    props.onClick();
  };

  return (
    <Typography className={classes.root} variant="h5" component="h2" onClick={() => handleClick()}>
      Add New...
    </Typography>
  );
};
