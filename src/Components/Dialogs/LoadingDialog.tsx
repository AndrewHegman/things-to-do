import React from "react";
import { Dialog as MuiDialog, CircularProgress, Typography } from "@material-ui/core";
import { useLoadingDialogStyles } from "./LoadingDialog.styles";

export interface ILoadingDialogProps {
  isOpen: boolean;
  dialogText?: string;
}

export const LoadingDialog: React.FC<ILoadingDialogProps> = (props) => {
  const { isOpen, dialogText } = props;
  const classes = useLoadingDialogStyles();

  return (
    <MuiDialog open={isOpen} fullScreen={false}>
      <div className={classes.loadingDialog}>
        <CircularProgress />
        <Typography>{dialogText || "Loading, please wait..."}</Typography>
      </div>
    </MuiDialog>
  );
};
