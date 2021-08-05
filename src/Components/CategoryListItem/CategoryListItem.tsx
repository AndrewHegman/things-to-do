import React from "react";
import {
  IconButton,
  Typography,
  ListItem,
  Menu,
  MenuItem,
  Dialog as MuiDialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@material-ui/core";
import { MoreVert } from "@material-ui/icons";
import { Category } from "../../Interface/Category";
import { useCategoryListItemStyles } from "./CategoryListItem.types";
import { categories } from "../../API/categories";
import { connect, ConnectedProps, useDispatch } from "react-redux";
import { RootState } from "../../Redux/Store/index";
import { actions } from "../../Redux";
import { LoadingDialog } from "../LoadingDialog/LoadingDialog";
import { TypographyInput } from "../TypographyInput";
import { InformationDialog } from "../InformationDialog/InformationDialog";

export interface ICategoryListItem extends PropsFromRedux {
  onNewTabClicked: (category: Category) => void;
  category: Category;
}

const mapStateToProps = (state: RootState) => ({
  isSlowMode: state.common.isSlowMode,
  slowModeTime: state.common.slowModeTime,
  categories: state.categories.categories,
});

enum Dialogs {
  BlankCategory = 0,
  IsLoading = 1,
  DuplicateCategory = 2,
  ConfirmDelete = 3,
}

export const CategoryListItemComponent: React.FC<ICategoryListItem> = (props) => {
  const [menuAnchorEl, setMenuAnchorEl] = React.useState<Element>();
  // const [showConfirmDelete, setShowConfirmDelete] = React.useState<boolean>(false);
  const [currentDialogs, setCurrentDialogs] = React.useState<Dialogs[]>([]);
  // const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isEditing, setIsEditing] = React.useState<boolean>(false);

  const categoryInputRef = React.useRef<HTMLInputElement>(null);

  const { onNewTabClicked, category, isSlowMode, slowModeTime } = props;
  const classes = useCategoryListItemStyles();
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (isEditing) {
      categoryInputRef.current && categoryInputRef.current.focus();
    }
  }, [isEditing]);

  const handleDeleteCategory = async () => {
    setCurrentDialogs([...currentDialogs, Dialogs.IsLoading]);
    try {
      const _categories = await categories.deleteCategory(category.key, isSlowMode, slowModeTime);
      dispatch(actions.categories.setCategories(_categories));
    } catch (error) {
      console.error(error);
      setCurrentDialogs(currentDialogs.filter((dialog) => dialog !== Dialogs.IsLoading));
      return;
    }
    setCurrentDialogs(currentDialogs.filter((dialog) => dialog !== Dialogs.IsLoading && dialog !== Dialogs.ConfirmDelete));
    setMenuAnchorEl(undefined);
  };

  const handleEditCategory = () => {
    setMenuAnchorEl(undefined);
    setIsEditing(true);
  };

  const updateCategory = async (text: string) => {
    if (text === "") {
      setCurrentDialogs([...currentDialogs, Dialogs.BlankCategory]);
      return;
    }

    const existingCategory = props.categories.find((category) => category.displayName === text);
    // Need to be sure that existingCategory even exists (if it doesn't the if should fail), so nullish coalescing won't work here
    if (existingCategory && existingCategory.key !== category.key) {
      setCurrentDialogs([...currentDialogs, Dialogs.DuplicateCategory]);
      return;
    }

    setCurrentDialogs([...currentDialogs, Dialogs.IsLoading]);
    const _categories = await categories.updateCategory(category.key, { displayName: text }, isSlowMode, slowModeTime);
    dispatch(actions.categories.setCategories(_categories));
    setCurrentDialogs(currentDialogs.filter((dialog) => dialog !== Dialogs.IsLoading));
    setIsEditing(false);
  };

  const closeDialog = (dialogToClose: Dialogs, refocus?: boolean) => {
    setCurrentDialogs(currentDialogs.filter((dialog) => dialog !== dialogToClose));
    console.log(currentDialogs.filter((dialog) => dialog !== dialogToClose));
    if (refocus && categoryInputRef.current) {
      categoryInputRef.current.focus();
    }
  };

  return (
    <>
      <ListItem
        button
        disableRipple
        onClick={() => {
          if (!menuAnchorEl) {
            onNewTabClicked(category);
          }
        }}
        key={category.key}
        className={classes.tab}
      >
        {isEditing && <TypographyInput defaultValue={category.displayName} onBlur={updateCategory} ref={categoryInputRef} />}
        {!isEditing && (
          <Typography variant={"h5"} component={"h2"}>
            {category.displayName}
          </Typography>
        )}
        <IconButton
          onClick={(event) => {
            event.stopPropagation();
            setMenuAnchorEl(event.currentTarget);
          }}
        >
          <MoreVert />
        </IconButton>
        <Menu anchorEl={menuAnchorEl} open={!!menuAnchorEl} onClose={() => setMenuAnchorEl(undefined)}>
          <MenuItem
            disableRipple
            onClick={(event) => {
              event.stopPropagation();
              handleEditCategory();
            }}
          >
            Edit
          </MenuItem>
          <MenuItem
            disableRipple
            onClick={(event) => {
              event.stopPropagation();

              setCurrentDialogs([...currentDialogs, Dialogs.ConfirmDelete]);
            }}
          >
            Delete
          </MenuItem>
        </Menu>
      </ListItem>

      <MuiDialog
        open={currentDialogs.includes(Dialogs.ConfirmDelete)}
        fullScreen={false}
        onClose={() => setCurrentDialogs(currentDialogs.filter((dialog) => dialog !== Dialogs.ConfirmDelete))}
      >
        <DialogTitle>Delete?</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to delete?</DialogContentText>
          <DialogActions>
            <Button
              onClick={() => {
                setCurrentDialogs(currentDialogs.filter((dialog) => dialog !== Dialogs.ConfirmDelete));
                setMenuAnchorEl(undefined);
              }}
            >
              Cancel
            </Button>
            <Button onClick={() => handleDeleteCategory()}>Yep!</Button>
          </DialogActions>
        </DialogContent>
      </MuiDialog>

      <LoadingDialog dialogText={"Deleting category..."} isLoading={currentDialogs.includes(Dialogs.IsLoading)} />
      <InformationDialog
        dialogText={"Categories names cannot be blank"}
        isOpen={currentDialogs.includes(Dialogs.BlankCategory)}
        onClose={() => {
          closeDialog(Dialogs.BlankCategory);
          setIsEditing(false);
        }}
      />
      <InformationDialog
        dialogText={"Categories must have a unique name"}
        isOpen={currentDialogs.includes(Dialogs.DuplicateCategory)}
        onClose={() => {
          closeDialog(Dialogs.DuplicateCategory);
          setIsEditing(false);
        }}
      />
    </>
  );
};

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
export const CategoryListItem = connector(CategoryListItemComponent);
