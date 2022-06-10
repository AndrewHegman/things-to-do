import {
  AppBar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { Close as CloseIcon } from "@mui/icons-material";
import React from "react";
import { actions, selectors, useAppDispatch, useAppSelector } from "../Redux";
import { Category } from "../Interface/Category";
import { APIBuilder } from "../API/urlBuilder";
import { getTransition } from "./Transition";
import axios, { AxiosError, AxiosResponse } from "axios";

export interface ICategoriesDialogProps {}

const Transition = getTransition("down");

export const CategoriesDialog: React.FC<ICategoriesDialogProps> = (props) => {
  const [categories, setCategories] = React.useState<Category[]>();
  const [categoryToDelete, setCategoryToDelete] = React.useState<string>();
  // If the user deletes a category, force them to select a category
  const [showCloseButton, setShowCloseButton] = React.useState(true);

  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(selectors.categoriesDialog.selectIsOpen);
  const apiBuilder = new APIBuilder();

  React.useEffect(() => {
    dispatch(actions.categories.setCategoriesLoading());
    apiBuilder
      .categories()
      .get()
      .fetch()
      .then((res: AxiosResponse<Category[]>) => {
        setCategories(res.data);
      })
      .catch((err: AxiosError) => {
        if (err.isAxiosError) {
          console.log(err.message);
        }
      })
      .finally(() => {
        dispatch(actions.categories.setCategoriesLoadingFinished());
      });
  }, []);

  const onCategoryClick = (category: Category) => {
    dispatch(actions.categories.setCurrentCategory(category));
    dispatch(actions.categoriesDialog.close());
  };

  const handleDeleteCategory = () => {
    if (categoryToDelete) {
      dispatch(actions.categories.setCategoriesLoading());
      setCategoryToDelete(undefined);
      setShowCloseButton(false);
      apiBuilder
        .categories()
        .delete()
        .byId(categoryToDelete)
        .fetch()
        .then((res: AxiosResponse<Category[]>) => {
          setCategories(res.data);
        })
        .catch((err: AxiosError) => {
          if (err.isAxiosError) {
            console.log(err.message);
          }
        })
        .finally(() => {
          dispatch(actions.categories.setCategoriesLoadingFinished());
        });
    }
  };

  return (
    <>
      <Dialog
        fullScreen
        open={isOpen}
        onClose={() => dispatch(actions.categoriesDialog.close())}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Box
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ display: "flex", paddingLeft: "5px" }}
          >
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Choose a category
            </Typography>
            <Button sx={{ color: "white" }} variant="text" onClick={() => dispatch(actions.categoriesDialog.close())}>
              <Typography
                variant="subtitle1"
                component="div"
                sx={{
                  flexGrow: 1,
                  textTransform: "none",
                  visibility: showCloseButton ? "visible" : "hidden",
                }}
              >
                Close
              </Typography>
            </Button>
          </Box>
        </AppBar>
        {categories ? (
          <List>
            {categories.map((category) => (
              <ListItem key={category._id} onClick={() => onCategoryClick(category)}>
                <ListItemText primary={category.displayName} />
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  onClick={(e) => {
                    e.stopPropagation();
                    setCategoryToDelete(category._id);
                  }}
                >
                  <CloseIcon />
                </IconButton>
              </ListItem>
            ))}
          </List>
        ) : (
          <div>Loading categories...</div>
        )}
      </Dialog>
      <Dialog open={!!categoryToDelete} onClose={() => setCategoryToDelete(undefined)}>
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This will remove the category along with all associated
            <em>things</em>.<br />
            <span style={{ color: "red" }}>
              <strong>This action cannot be undone.</strong>
            </span>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCategoryToDelete(undefined)}>Nevermind</Button>
          <Button onClick={() => handleDeleteCategory()}>
            <strong>I'm sure</strong>
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
