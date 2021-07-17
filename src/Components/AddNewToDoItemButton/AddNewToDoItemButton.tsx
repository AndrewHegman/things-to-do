import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
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
    <Card onClick={() => handleClick()} className={classes.root}>
      <CardContent>
        <Typography variant="h5" component="h2">
          Add New...
        </Typography>
      </CardContent>
    </Card>
  );
};
