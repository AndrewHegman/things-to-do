import { Avatar, Box, Typography } from "@mui/material";
import { RadioButtonUnchecked } from "@mui/icons-material";
import React from "react";
import { Category } from "@ttd/graphql";
import { useNavigate } from "react-router";
import { useStore } from "../store";

interface ICategoryItemProps {
  category: Category;
}

export const CategoryItem: React.FC<ICategoryItemProps> = (props) => {
  const { category } = props;
  const navigate = useNavigate();
  const { setCurrentCategory, things } = useStore();

  const handleClick = () => {
    setCurrentCategory(category);
    navigate(`category/${category.id}`, { state: { category } });
  };

  const categoryThings = React.useMemo(() => things.filter((thing) => thing.category.id === category.id), [things, category]);

  return (
    <Box sx={{ display: "flex", alignItems: "center", margin: "2% 5% 2% 5%" }} onClick={handleClick}>
      <RadioButtonUnchecked sx={{ color: "primary.main", width: "30px", height: "30px", marginRight: "10px" }} />
      <div style={{ display: "flex", justifyContent: "space-between", width: "100%", alignItems: "center" }}>
        <Typography fontSize="24px" height="100%">
          {category.name}
        </Typography>
        <Avatar sx={{ width: "30px", height: "30px" }}>{categoryThings.length}</Avatar>
      </div>
    </Box>
  );
};
