import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@material-ui/core";
import React from "react";

interface IConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  onCancel: () => void;
  text: string;
  title: string;
  confirmText?: string;
  cancelText?: string;
}

export const ConfirmationDialog: React.FC<IConfirmationDialogProps> = (props) => {
  const { isOpen, onClose, onConfirm, confirmText = "Yep!", onCancel, cancelText = "Cancel", title, text } = props;
  return (
    <Dialog open={isOpen} fullScreen={false} onClose={() => onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{text}</DialogContentText>
        <DialogActions>
          <Button onClick={() => onCancel()}>{cancelText}</Button>
          <Button onClick={() => onConfirm()}>{confirmText}</Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};
