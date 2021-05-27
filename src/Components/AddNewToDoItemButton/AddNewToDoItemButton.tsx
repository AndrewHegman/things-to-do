import React from "react";
import { Card, Fab, CardContent, Typography } from "@material-ui/core";
import { Add as AddIcon } from "@material-ui/icons";
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
    // <Fab className={classes.floatingActionButton}>
    //   <AddIcon />
    // </Fab>
    <Card onClick={() => handleClick()}>
      <CardContent>
        <Typography variant="h5" component="h2">
          Add New...
        </Typography>
      </CardContent>
    </Card>
  );
};
