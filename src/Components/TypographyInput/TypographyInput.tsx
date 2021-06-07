import { InputBase } from "@material-ui/core";
import { useTypographyInputStyles } from "./TypographyInput.styles";
import { Variant } from "@material-ui/core/styles/createTypography";

import React from "react";

interface ITypographInputProps {
  placeholder?: string;
  clearTextOnFirstEnter?: boolean;
  clearTextOnEnter?: boolean;
  onBlur?: (text: string) => void;
  variant?: Variant;
  defaultValue?: string;
  resetOnEmpty?: boolean; // default to true
  ref?: React.Ref<HTMLInputElement | undefined>; // Currently doesn't work -- need a ForwardRef
  onChange?: (text: string) => void;
}

export const TypographyInput: React.FC<ITypographInputProps> = (props) => {
  const { variant, placeholder, clearTextOnFirstEnter, clearTextOnEnter, defaultValue, onBlur, ref, resetOnEmpty, onChange } = props;
  const [text, setText] = React.useState<string>(defaultValue || "");
  const isModified = React.useRef<boolean>(false);

  const onTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    isModified.current = true;
    setText(event.target.value);
    onChange && onChange(event.target.value);
  };

  const onClick = () => {
    if (clearTextOnFirstEnter && isModified.current === false) {
      setText("");
    } else if (clearTextOnEnter) {
      setText("");
    }
  };

  const handleOnBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    // resetOnEmpty should default to 'true' but it is optional (hence the verbose boolean check)
    if (!isModified.current || (text === "" && resetOnEmpty !== false)) {
      setText(defaultValue || "");
      isModified.current = false;
    }
    if (onBlur) {
      onBlur(event.target.value);
    }
  };

  const classes = useTypographyInputStyles(variant || "h5")();
  return (
    <InputBase
      className={classes.inputTypography}
      value={text}
      placeholder={placeholder}
      onChange={onTextChange}
      onClick={onClick}
      onBlur={handleOnBlur}
      ref={ref}
    />
  );
};
