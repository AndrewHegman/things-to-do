import { AppBar, Button, Dialog, List, ListItem, ListItemText, Slide } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { Box } from "@mui/system";
import React from "react";
import { actions, selectors, useAppDispatch, useAppSelector } from "../Redux";
import { categories as categoriesApi } from "../API/categories";
import { Category } from "../Interface/Category";
import { APIBuilder } from "../API/urlBuilder";

export interface ICategoriesDialogProps {}

const Transition = React.forwardRef(function Transition(props: TransitionProps & { children: React.ReactElement }, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export const CategoriesDialog: React.FC<ICategoriesDialogProps> = (props) => {
  const [categories, setCategories] = React.useState<Category[]>();

  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(selectors.categoriesDialog.selectIsOpen);
  const apiBuilder = new APIBuilder();

  const getCategories = async () => {
    dispatch(actions.categories.setCategoriesLoading());
    const loadedCategories = await apiBuilder.categories().get().fetch();
    setCategories(loadedCategories);
    dispatch(actions.categories.setCategoriesLoadingFinished());
  };

  React.useEffect(() => {
    getCategories();
  }, []);

  const onCategoryClick = (category: Category) => {
    dispatch(actions.categories.setCurrentCategory(category));
    dispatch(actions.categoriesDialog.close());
  };

  return (
    <Dialog fullScreen open={isOpen} onClose={() => dispatch(actions.categoriesDialog.close())} TransitionComponent={Transition}>
      <AppBar sx={{ position: "relative" }}>
        <Box flexDirection="row" justifyContent="flex-end" sx={{ display: "flex" }}>
          <Button sx={{ color: "white" }} variant="text" onClick={() => dispatch(actions.categoriesDialog.close())}>
            Close
          </Button>
        </Box>
      </AppBar>
      {categories ? (
        <List>
          {categories.map((category) => (
            <ListItem key={category.key} onClick={() => onCategoryClick(category)}>
              <ListItemText primary={category.displayName} />
            </ListItem>
          ))}
        </List>
      ) : (
        <div>Loading categories...</div>
      )}
    </Dialog>
  );
};
