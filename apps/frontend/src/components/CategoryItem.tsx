import { Avatar, Box, Typography } from "@mui/material";
import { RadioButtonUnchecked } from "@mui/icons-material";
import React from "react";
import { Category } from "@ttd/graphql";
import { useNavigate } from "react-router";
import { useStore } from "../store";

interface ICategoryItemProps {
  category: Category;
}

type CategoryItemProps =
  | {
      category: Category;
      creating?: false | undefined;
      onBlur?: never;
    }
  | {
      category?: never;
      creating: true;
      onBlur?: (categoryName: string) => void;
    };

export const CategoryItem: React.FC<CategoryItemProps> = (props) => {
  const { category, creating, onBlur } = props;
  const navigate = useNavigate();
  const { setCurrentCategory, things } = useStore();
  const newCategoryRef = React.useRef<HTMLSpanElement | null>(null);

  React.useEffect(() => {
    if (newCategoryRef.current) {
      newCategoryRef.current.focus();
    }
  }, [newCategoryRef]);

  const handleClick = () => {
    if (!creating) {
      setCurrentCategory(category);
      navigate(`category/${category.id}`, { state: { category } });
    }
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", margin: "2% 5% 2% 5%" }} onClick={handleClick}>
      <RadioButtonUnchecked sx={{ color: "primary.main", width: "30px", height: "30px", marginRight: "10px" }} />
      <div style={{ display: "flex", justifyContent: "space-between", width: "100%", alignItems: "center" }}>
        {!creating && (
          <>
            <Typography fontSize="24px" height="100%">
              {category.name}
            </Typography>
            <Avatar sx={{ width: "30px", height: "30px" }}>
              {things.filter((thing) => thing.category.id === category.id).length}
            </Avatar>
          </>
        )}
        {creating && (
          <Typography
            fontSize="24px"
            height="100%"
            sx={{ whiteSpace: "nowrap" }}
            ref={newCategoryRef}
            suppressContentEditableWarning
            contentEditable
            onBlur={(e) => onBlur && onBlur(newCategoryRef.current!.textContent || "")}
          ></Typography>
        )}
      </div>
    </Box>
  );
};
