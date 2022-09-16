import { HighlightOff } from "@mui/icons-material";
import { Box, SxProps, Theme, Typography } from "@mui/material";
import { Tag as TagType } from "@ttd/graphql";
import React from "react";

type TagProps = {
  sx?: SxProps<Theme>;
  onClose?: (tag: TagType) => void;
  onClick?: () => void;
  active?: boolean;
};

type OptionalTagProps =
  | {
      tag: TagType;
      creating?: false | undefined;
      onBlur?: never;
    }
  | {
      tag: string;
      creating: true;
      onBlur?: (name: string) => void;
    };

export const Tag: React.FC<TagProps & OptionalTagProps> = (props) => {
  const { tag, sx, onClose, active, onClick, creating, onBlur } = props;
  const newTagRef = React.useRef<HTMLSpanElement | null>(null);
  const [newTagName, setNewTagName] = React.useState("");

  React.useEffect(() => {
    if (newTagRef.current) {
      newTagRef.current.focus();
    }
  }, [newTagRef]);

  return (
    <Box
      fontSize={14}
      onClick={() => onClick && onClick()}
      sx={{
        borderWidth: "2px",
        borderStyle: "solid",
        borderColor: active || creating ? "secondary.main" : "primary.main",
        display: "flex",
        padding: "0px 5px 0px 5px",
        borderRadius: "8px",
        ...sx,
      }}
    >
      {/* Since undefined is falsy and 'creating' is optional, we have to explicitly check against false */}
      {!creating ? (
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
          <Typography sx={{ whiteSpace: "nowrap" }} color={active ? "secondary.main" : "text.primary"}>
            {tag.name}
          </Typography>
          {onClose && <HighlightOff onClick={() => onClose(tag)} />}
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
          <Typography
            sx={{ whiteSpace: "nowrap" }}
            color="secondary.main"
            suppressContentEditableWarning
            contentEditable
            ref={newTagRef}
            onChange={(e) => console.log(e)}
            onBlur={() => onBlur && onBlur(newTagRef.current!.textContent || "")} // TODO: See if there is a better way to do this
          ></Typography>
        </div>
      )}
    </Box>
  );
};
