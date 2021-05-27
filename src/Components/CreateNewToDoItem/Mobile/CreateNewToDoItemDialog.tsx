import React from "react";
import { IBaseCreateNewToDoItemDIalogProps } from "../Common";
import { Dialog } from "../../Dialog/Dialog";
import { AppBar } from "../../AppBar/AppBar";
import { Button, Typography } from "@material-ui/core";
import { useCreateNewToDoItemDialogStyles } from "./CreateNewToDoItemDialog.styles";

interface IMobileCreateNewToDoItemDIalogProps extends IBaseCreateNewToDoItemDIalogProps {}

export const CreateNewToDoItemDialog: React.FC<IMobileCreateNewToDoItemDIalogProps> = (props) => {
  const classes = useCreateNewToDoItemDialogStyles();
  return (
    <Dialog isOpen={props.isOpen} onClose={props.onClose} onTransitionFinished={props.onTransitionFinished} direction={"up"}>
      <AppBar className={classes.dialogAppBar}>
        <Typography className={classes.activeTab} variant="button">
          YOU NEED REDUX TO MAKE YOUR LIFE EASIER (you could then just reference the "global" active tab name)
        </Typography>
        <Button onClick={props.onCloseClicked || props.onClose} color="inherit">
          close
        </Button>
      </AppBar>
    </Dialog>
  );
};
