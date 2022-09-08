import { Typography } from "@mui/material";
import { Tag as TagType } from "@ttd/graphql";
import React from "react";

interface TagProps {
  tag: TagType;
}

export const Tag: React.FC<TagProps> = (props) => {
  return (
    <Typography
      fontSize={14}
      sx={{
        borderWidth: "2px",
        borderStyle: "solid",
        borderColor: "primary.main",
        display: "flex",
        padding: "0px 5px 0px 5px",
        borderRadius: "2px",
      }}
    >
      {props.tag.name}
    </Typography>
  );
};
