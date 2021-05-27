import React from "react";
import { Card, CardContent, Typography, Chip, Divider, InputBase } from "@material-ui/core";
import { useToDoItemStyles } from "./ToDoItem.styles";
import { Info as InfoButton, Delete as DeleteIcon, Edit as EditIcon } from "@material-ui/icons";
import { IToDoItemProps } from "../Common";
import { features } from "../../../features";

interface IMobileToDoItemProps extends IToDoItemProps {}

export const ToDoItem: React.FC<IMobileToDoItemProps> = (props) => {
  const classes = useToDoItemStyles();
  return (
    <Card className={classes.root}>
      <CardContent>
        <div className={classes.contentContainer}>
          <div className={classes.infoContainer}>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
              {props.category}
            </Typography>
            <Typography variant="h5" component="h2">
              {props.item.name}
            </Typography>
            {features.useTags && props.item.tags.map((tag) => <Chip className={classes.tags} label={tag.name} key={tag.name} />)}
          </div>
          <div className={classes.actionsContainer}>
            <EditIcon onClick={() => props.onEdit()} />
            <Divider />
            <InfoButton onClick={() => props.onInfo()} />
            <Divider />
            <DeleteIcon onClick={() => props.onDelete()} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
