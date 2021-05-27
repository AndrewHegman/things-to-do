import React from "react";
import { Dialog as MuiDialog, Slide, SlideProps } from "@material-ui/core";
import { TransitionProps } from "@material-ui/core/transitions/transition";
import { IBaseDialogProps } from "../Common";

interface IMobileDialogProps extends IBaseDialogProps {}

const Transition = (direction: SlideProps["direction"]) =>
  React.forwardRef(function Transition(props: TransitionProps & { children?: React.ReactElement }, ref: React.Ref<unknown>) {
    return <Slide direction={direction} ref={ref} {...props} />;
  });

export const Dialog: React.FC<IMobileDialogProps> = ({ isOpen, onClose, onTransitionFinished, children, direction }) => {
  const TransitionComponent = React.useRef(Transition(direction || "down"));
  return (
    <MuiDialog
      fullScreen
      open={isOpen}
      onClose={onClose}
      TransitionComponent={TransitionComponent.current}
      TransitionProps={{ onExited: onTransitionFinished }}
    >
      {children}
    </MuiDialog>
  );
};
