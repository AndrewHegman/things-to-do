import React from "react";
import {
  Typography,
  ListItem,
  Dialog as MuiDialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@material-ui/core";
import { Category } from "../../Interface/Category";
import { useCategoryListItemStyles } from "./CategoryListItem.types";
import { categories } from "../../API/categories";
import { connect, ConnectedProps, useDispatch } from "react-redux";
import { RootState } from "../../Redux/Store/index";
import { actions } from "../../Redux";
import { LoadingDialog } from "../LoadingDialog/LoadingDialog";
import { TypographyInput } from "../TypographyInput";
import { InformationDialog } from "../InformationDialog/InformationDialog";
import { ActionMenu } from "../ActionMenu/ActionMenu";
import { ConfirmationDialog } from "../ConfirmationDialog/ConfirmationDialog";

interface ICategoryListItem extends PropsFromRedux {
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
  const [currentDialogs, setCurrentDialogs] = React.useState<Dialogs[]>([]);
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
    openDialogs([Dialogs.IsLoading]);
    try {
      const _categories = await categories.deleteCategory(category.key, isSlowMode, slowModeTime);
      dispatch(actions.categories.setCategories(_categories));
    } catch (error) {
      console.error(error);
      closeDialogs([Dialogs.IsLoading]);
      return;
    }
    closeDialogs([Dialogs.ConfirmDelete, Dialogs.IsLoading]);
    setMenuAnchorEl(undefined);
  };

  const handleEditCategory = () => {
    setMenuAnchorEl(undefined);
    setIsEditing(true);
  };

  const updateCategory = async (text: string) => {
    if (text === "") {
      openDialogs([Dialogs.BlankCategory]);
      return;
    }

    const existingCategory = props.categories.find((category) => category.displayName === text);
    // Make sure this isn't a duplicate category
    // Check if another category already exists (and ensure that its not itself)
    // Need to be sure that existingCategory even exists (if it doesn't the if should fail), so optional chaining won't work here--go ahead and try it, you'll see
    if (existingCategory && existingCategory.key !== category.key) {
      openDialogs([Dialogs.DuplicateCategory]);
      return;
    }

    // Don't do anything if the name hasn't changed
    if (text !== category.displayName) {
      openDialogs([Dialogs.IsLoading]);
      const _categories = await categories.updateCategory(category.key, { displayName: text }, isSlowMode, slowModeTime);
      dispatch(actions.categories.setCategories(_categories));
      closeDialogs([Dialogs.IsLoading]);
    }
    setIsEditing(false);
  };

  const closeDialogs = (dialogsToClose: Dialogs[], refocus?: boolean) => {
    setCurrentDialogs(currentDialogs.filter((dialog) => !dialogsToClose.includes(dialog)));
    if (refocus && categoryInputRef.current) {
      categoryInputRef.current.focus();
    }
  };

  const openDialogs = (dialogsToOpen: Dialogs[]) => {
    dialogsToOpen.forEach((dialog) => {
      if (!currentDialogs.includes(dialog)) {
        setCurrentDialogs([...currentDialogs, dialog]);
      }
    });
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
        <ActionMenu
          menuItems={[
            {
              onClick: (event) => {
                event.stopPropagation();
                handleEditCategory();
              },
              text: "Edit",
              closeMenuOnClick: true,
            },
            {
              onClick: (event) => {
                event.stopPropagation();
                openDialogs([Dialogs.ConfirmDelete]);
              },
              text: "Delete",
              closeMenuOnClick: false,
            },
          ]}
        />
      </ListItem>

      <ConfirmationDialog
        isOpen={currentDialogs.includes(Dialogs.ConfirmDelete)}
        onClose={() => closeDialogs([Dialogs.ConfirmDelete])}
        title="Delete?"
        text="Are you sure you want to delete?"
        onCancel={() => {
          closeDialogs([Dialogs.ConfirmDelete]);
          setMenuAnchorEl(undefined);
        }}
        onConfirm={() => handleDeleteCategory()}
      />

      <LoadingDialog dialogText={"Please wait..."} isOpen={currentDialogs.includes(Dialogs.IsLoading)} />
      <InformationDialog
        dialogText={"Categories names cannot be blank"}
        isOpen={currentDialogs.includes(Dialogs.BlankCategory)}
        onClose={() => {
          closeDialogs([Dialogs.BlankCategory]);
          setIsEditing(false);
        }}
      />
      <InformationDialog
        dialogText={"Categories must have a unique name"}
        isOpen={currentDialogs.includes(Dialogs.DuplicateCategory)}
        onClose={() => {
          closeDialogs([Dialogs.DuplicateCategory]);
          setIsEditing(false);
        }}
      />
    </>
  );
};

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
export const CategoryListItem = connector(CategoryListItemComponent);
