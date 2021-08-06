import React from "react";
import { Button, Dialog as MuiDialog, DialogActions, Typography } from "@material-ui/core";

export interface IInformationDialogProps {
  isOpen: boolean;
  dialogText: string;
  onClose?: () => void;
}

export const InformationDialog: React.FC<IInformationDialogProps> = (props) => {
  const { isOpen, dialogText, onClose } = props;

  return (
    <MuiDialog open={isOpen} fullScreen={false}>
      <Typography>{dialogText}</Typography>
      <DialogActions>
        <Button onClick={() => onClose && onClose()}>Ok</Button>
      </DialogActions>
    </MuiDialog>
  );
};
