import React from "react";
import { Card, CardContent, Typography, Divider } from "@material-ui/core";
import { useToDoItemStyles } from "./ToDoItem.styles";
import { Info as InfoButton, Delete as DeleteIcon, Edit as EditIcon } from "@material-ui/icons";
import { ICreatingNewToDoItemProps } from "../Common";
import { TypographyInput } from "../../TypographyInput/TypographyInput";

interface IMobileCreatingNewToDoItem extends ICreatingNewToDoItemProps {}

export const CreatingNewToDoItem: React.FC<IMobileCreatingNewToDoItem> = (props) => {
  const { onSubmit } = props;
  const classes = useToDoItemStyles();

  // Should update this component to delete itself if the user doesn't interact with it and focuses somewhere else
  return (
    <Card className={classes.root}>
      <CardContent>
        <div className={classes.contentContainer}>
          <div className={classes.infoContainer}>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
              {props.category}
            </Typography>
            <TypographyInput defaultValue={"Enter name..."} clearTextOnFirstEnter onBlur={onSubmit} />
          </div>
          <div className={classes.actionsContainer}>
            <EditIcon />
            <Divider />
            <InfoButton />
            <Divider />
            <DeleteIcon />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
