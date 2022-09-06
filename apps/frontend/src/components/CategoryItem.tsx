import { Avatar, Box, Typography } from "@mui/material";
import { RadioButtonUnchecked } from "@mui/icons-material";
import React from "react";
import { Category } from "@ttd/graphql";

interface ICategoryItemProps {
  category: Category;
}

export const CategoryItem: React.FC<ICategoryItemProps> = (props) => {
  const { category } = props;
  return (
    <Box sx={{ display: "flex", alignItems: "center", margin: "2% 5% 2% 5%" }}>
      <RadioButtonUnchecked />
      <div style={{ display: "flex", justifyContent: "space-between", width: "100%", alignItems: "center" }}>
        <Typography fontSize="24px" height="100%">
          {category.name}
        </Typography>
        <Avatar sx={{ width: "30px", height: "30px" }}>{category.things.length}</Avatar>
      </div>
    </Box>
  );
};
