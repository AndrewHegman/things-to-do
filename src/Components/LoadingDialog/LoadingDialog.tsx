import React from "react";
import { Dialog as MuiDialog, CircularProgress, Typography } from "@material-ui/core";
import { useLoadingDialogStyles } from "./LoadingDialog.styles";

export interface ILoadingDialogProps {
  isLoading: boolean;
  dialogText: string;
}

export const LoadingDialog: React.FC<ILoadingDialogProps> = (props) => {
  const { isLoading, dialogText } = props;
  const classes = useLoadingDialogStyles();

  return (
    <MuiDialog open={isLoading} fullScreen={false}>
      <div className={classes.loadingDialog}>
        <CircularProgress />
        <Typography>{dialogText}</Typography>
      </div>
    </MuiDialog>
  );
};
