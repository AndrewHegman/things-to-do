import { SlideProps } from "@material-ui/core";

export interface IBaseDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onTransitionFinished?: () => void;
  direction?: SlideProps["direction"];
}
