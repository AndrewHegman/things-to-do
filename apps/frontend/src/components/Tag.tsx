import { HighlightOff } from "@mui/icons-material";
import { Box, SxProps, Theme, Typography } from "@mui/material";
import { Tag as TagType } from "@ttd/graphql";
import React from "react";

interface TagProps {
  tag: TagType;
  sx?: SxProps<Theme>;
  onClose?: (id: TagType) => void;
}

export const Tag: React.FC<TagProps> = (props) => {
  const { tag, sx, onClose } = props;
  return (
    <>
      <Box
        fontSize={14}
        sx={{
          borderWidth: "2px",
          borderStyle: "solid",
          borderColor: "primary.main",
          display: "flex",
          padding: "0px 5px 0px 5px",
          borderRadius: "8px",

          ...sx,
        }}
      >
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
          <Typography sx={{ whiteSpace: "nowrap" }}>{tag.name}</Typography>
          {onClose && <HighlightOff onClick={() => onClose(tag)} />}
        </div>
      </Box>
    </>
  );
};
