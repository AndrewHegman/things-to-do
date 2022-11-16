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
  const { setCurrentCategory } = useStore();
  const newCategoryRef = React.useRef<HTMLSpanElement | null>(null);

  React.useEffect(() => {
    if (newCategoryRef.current) {
      newCategoryRef.current.focus();
    }
  }, [newCategoryRef]);

  const handleClick = () => {
    setCurrentCategory(category);
    navigate(`category/${category.id}`, { state: { category } });
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", margin: "2% 5% 2% 5%" }} onClick={handleClick}>
      <RadioButtonUnchecked sx={{ color: "primary.main", width: "30px", height: "30px", marginRight: "10px" }} />
      <div style={{ display: "flex", justifyContent: "space-between", width: "100%", alignItems: "center" }}>
        <Typography fontSize="24px" height="100%">
          {category.name}
        </Typography>
        <Avatar sx={{ width: "30px", height: "30px" }}>{category.things.length}</Avatar>
      </div>
    </Box>
  );
};
