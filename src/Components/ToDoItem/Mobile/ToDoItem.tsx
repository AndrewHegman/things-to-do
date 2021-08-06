import React from "react";
import { Card, CardContent, Typography, Chip, Divider } from "@material-ui/core";
import { useToDoItemStyles } from "./ToDoItem.styles";
import { IToDoItemProps } from "../Common";
import { features } from "../../../features";
import { ActionMenu } from "../../ActionMenu/ActionMenu";
import { TypographyInput } from "../../TypographyInput";

interface IMobileToDoItemProps extends IToDoItemProps {}

export const ToDoItem: React.FC<IMobileToDoItemProps> = (props) => {
  const classes = useToDoItemStyles();

  const { item, tags } = props;

  return (
    <>
      <div className={classes.contentContainer}>
        <div className={classes.infoContainer}>
          <Typography variant="h5" component="h2">
            {item?.name}
          </Typography>
          {features.useTags && tags.map((tag) => <Chip className={classes.tags} label={tag} key={tag} />)}
        </div>
        <ActionMenu menuItems={[]} />
      </div>
      <Divider />
    </>
  );
};
