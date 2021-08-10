import React from "react";
import { Button, Dialog as MuiDialog, DialogActions, DialogContent, DialogTitle, Input } from "@material-ui/core";

interface IInputDialogProps {
  isOpen: boolean;
  title: string;
  onSubmit: (value: string) => void;
  onCancel: () => void;
  submitText: string;
  cancelText: string;
  placeholder?: string;
  clearOnClose?: boolean;
}

export const InputDialog: React.FC<IInputDialogProps> = (props) => {
  const [text, setText] = React.useState<string>("");
  const { title, isOpen, onSubmit, onCancel, cancelText, submitText, placeholder, clearOnClose } = props;
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (!isOpen && clearOnClose !== false) {
      setText("");
    }

    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [clearOnClose, isOpen, inputRef]);

  return (
    <MuiDialog open={isOpen} fullScreen={false}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Input onChange={(e) => setText(e.target.value)} value={text} placeholder={placeholder || ""} inputRef={inputRef} />
        <DialogActions>
          <Button onClick={onCancel}>{cancelText}</Button>
          <Button onClick={() => onSubmit(text)}>{submitText}</Button>
        </DialogActions>
      </DialogContent>
    </MuiDialog>
  );
};
