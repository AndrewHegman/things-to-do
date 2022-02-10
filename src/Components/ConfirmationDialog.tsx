import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

interface IConfirmationDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  onCancel?: () => void;
  title: string;
}

export const ConfirmationDialog: React.FC<
  React.PropsWithChildren<IConfirmationDialogProps>
> = (props) => {
  const { open, onClose, onConfirm, onCancel, title, children } = props;

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{children}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            onCancel && onCancel();
            onClose();
          }}
        >
          Nevermind
        </Button>
        <Button onClick={onConfirm}>
          <strong>I'm sure</strong>
        </Button>
      </DialogActions>
    </Dialog>
  );
};
