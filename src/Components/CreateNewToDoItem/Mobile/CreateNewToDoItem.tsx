import React from "react";
import { Card, CardContent, Typography, Chip, Divider } from "@material-ui/core";
import { useCreateNewToDoItemStyles } from "./CreateNewToDoItem.styles";
import { ICreateNewToDoItemProps } from "../Common";

interface IMobileCreateNewToDoItemProps extends ICreateNewToDoItemProps {}

export const CreateNewToDoItem: React.FC<IMobileCreateNewToDoItemProps> = (props) => {
  const classes = useCreateNewToDoItemStyles();
  return (
    <Card className={classes.root}>
      <CardContent>
        <div className={classes.contentContainer}>
          <div className={classes.infoContainer}>
            <Typography variant="h5" component="h2">
              Add new...
            </Typography>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
