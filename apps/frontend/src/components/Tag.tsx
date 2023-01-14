import { HighlightOff } from "@mui/icons-material";
import { Box, SxProps, Theme, Typography } from "@mui/material";
import { Tag as TagType } from "@ttd/graphql";
import React from "react";

type TagProps = {
  tag: TagType;
  sx?: SxProps<Theme>;
  color?: string;
  onClose?: (tag: TagType) => void;
  onClick?: () => void;
  active?: boolean;
};

export const Tag: React.FC<TagProps> = (props) => {
  const { tag, sx, color, onClose, active, onClick } = props;

  const newTagRef = React.useRef<HTMLSpanElement | null>(null);

  React.useEffect(() => {
    if (newTagRef.current) {
      newTagRef.current.focus();
    }
  }, [newTagRef]);

  const getBoxColor = () => {
    if (color) {
      return color;
    }
    return active ? "secondary.main" : "primary.main";
  };

  const getTextColor = () => {
    if (color) {
      return color;
    }
    return !active ? "text.primary" : "secondary.main";

    // NOT creating, NOT active --> text.primary
    // NOT creating, active --> secondary.main
    // creating, NOT active --> secondary.main
    // creating, active --> secondary.main
  };

  return (
    <Box
      fontSize={14}
      onClick={() => onClick && onClick()}
      sx={{
        borderWidth: "2px",
        borderStyle: "solid",
        borderColor: getBoxColor(),
        display: "flex",
        padding: "0px 5px 0px 5px",
        borderRadius: "8px",
        ...sx,
      }}
    >
      <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
        <Typography sx={{ whiteSpace: "nowrap" }} color={getTextColor()}>
          {tag.name}
        </Typography>
        {onClose && <HighlightOff onClick={() => onClose(tag)} />}
      </div>
    </Box>
  );
};
