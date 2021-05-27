import React from "react";
import { Card, CardContent, Typography, Chip, Divider, Button, List, ListItem, InputBase } from "@material-ui/core";
import { AppBar } from "../../AppBar/AppBar";
import { useCreateNewToDoItemStyles } from "./CreateNewToDoItem.styles";
import { ICreateNewToDoItemProps } from "../Common";
import { Dialog } from "../../Dialog/Dialog";
import { CreateNewToDoItemDialog } from "./CreateNewToDoItemDialog";

interface IMobileCreateNewToDoItemProps extends ICreateNewToDoItemProps {}

export const CreateNewToDoItem: React.FC<IMobileCreateNewToDoItemProps> = (props) => {
  const classes = useCreateNewToDoItemStyles();
  const [showDialog, setShowDialog] = React.useState<boolean>(false);

  const onTransitionFinished = () => {};

  const onClick = () => {
    console.log("this should dispatch an action to create a new card...");
    console.log("err...fire off a REST API to create a new card and update the redux store");
  };

  return (
    <>
      <Card className={classes.root} onClick={onClick}>
        <CardContent>
          <div className={classes.contentContainer}>
            <div className={classes.infoContainer}>
              <InputBase value={"Add new..."} />
            </div>
          </div>
        </CardContent>
      </Card>
      <CreateNewToDoItemDialog isOpen={showDialog} onClose={() => setShowDialog(false)} onTransitionFinished={() => onTransitionFinished()} />
    </>
  );
};
