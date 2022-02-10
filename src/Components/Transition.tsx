import React, { JSXElementConstructor } from "react";
import { Slide, SlideProps } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";

export interface ITransitionProps {
  direction: SlideProps["direction"];
}

export const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children: React.ReactElement } & ITransitionProps,
  ref
) {
  return <Slide ref={ref} {...props} />;
});

// const Transition = React.forwardRef(function Transition(props: TransitionProps & { children: React.ReactElement }, ref) {
//   return <Slide direction="down" ref={ref} {...props} />;
// });

export const getTransition = (direction: SlideProps["direction"]) =>
  React.forwardRef((props: TransitionProps & { children: React.ReactElement }, ref) => {
    return <Slide direction={direction} ref={ref} {...props} />;
  });
