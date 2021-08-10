import React from "react";
import {
  Button,
  Dialog as MuiDialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";

export interface IInformationDialogProps {
  isOpen: boolean;
  dialogText: string;
  onClose?: () => void;
  title?: string;
}

export const InformationDialog: React.FC<IInformationDialogProps> = (props) => {
  const { isOpen, dialogText, onClose, title } = props;

  return (
    <MuiDialog open={isOpen} fullScreen={false}>
      {title && <DialogTitle>{title}</DialogTitle>}
      <DialogContent>
        <DialogContentText>{dialogText}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClose && onClose()}>Ok</Button>
      </DialogActions>
    </MuiDialog>
  );
};
