import { SlideProps } from "@material-ui/core";

export interface IBaseDialogProps {
  isOpen: boolean;
  onClose?: (event?: {}, reason?: "backdropClick" | "escapeKeyDown") => void;
  onTransitionFinished?: () => void;
  direction?: SlideProps["direction"];
}
