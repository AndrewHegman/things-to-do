import { Chip } from "@mui/material";
import React from "react";

export interface ITagProps {
  label: string;
  onClick: () => void;
}

export const Tag: React.FC<ITagProps> = ({ label, onClick }) => {
  return <Chip label={label} sx={{ margin: "5px" }} onClick={onClick} />;
};
