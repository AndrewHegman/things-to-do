import { Typography } from "@mui/material";
import { MoreHoriz, RadioButtonUnchecked } from "@mui/icons-material";
import React from "react";
import { Thing as ThingType } from "@ttd/graphql";
import { Tag } from "./Tag";

interface IThingProps {
  thing: ThingType;
  onClickMore?: () => void;
}

export const Thing: React.FC<IThingProps> = (props) => {
  const { thing, onClickMore } = props;

  return (
    <div style={{ display: "flex", flexDirection: "column", marginBottom: "10px", position: "relative" }} draggable>
      <div style={{ display: "flex", alignItems: "center" }}>
        <RadioButtonUnchecked sx={{ color: "primary.main", width: "30px", height: "30px", marginRight: "10px" }} />
        <Typography fontSize={24}>{thing.name}</Typography>
        <div style={{ marginLeft: "auto" }}>
          <MoreHoriz
            sx={{ marginRight: "25px" }}
            onClick={(e) => {
              e.preventDefault();
              onClickMore && onClickMore();
            }}
          />
        </div>
      </div>
      <Typography>{thing.description}</Typography>
      <div style={{ display: "flex", gap: "10px" }}>
        {thing.tags.map((tag) => (
          <Tag key={tag.id} tag={tag} />
        ))}
      </div>
    </div>
  );
};
