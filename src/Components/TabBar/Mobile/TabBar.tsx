import React from "react";
import { IconButton, Typography, Button, List, ListItem, Divider } from "@material-ui/core";
import { Menu as MenuIcon } from "@material-ui/icons";
import { useTabBarStyles } from "./TabBar.styles";
import { AppBar } from "../../AppBar/AppBar";
import { IBaseTabBarProps } from "../Common";
import { Dialog } from "../../Dialog/Dialog";
import { Category } from "../../../Interface/Category";
import { TypographyInput } from "../../TypographyInput";
import { v4 as uuidv4 } from "uuid";
import { connect, ConnectedProps, useDispatch } from "react-redux";
import { RootState } from "../../../Redux/store";
import { actions } from "../../../Redux";
import { categories } from "../../../API/categories";
import { CategoryListItem } from "../../CategoryListItem/CategoryListItem";
import { LoadingDialog } from "../../Dialogs/LoadingDialog";
import { InformationDialog } from "../../Dialogs/InformationDialog";

const newCategoryPlaceholder = "New Category...";

interface ITabBarProps extends IBaseTabBarProps, PropsFromRedux {}

const mapStateToProps = (state: RootState) => {
  return {
    categories: state.categories.categories,
    currentCategory: state.categories.currentCategory,
    isSlowMode: state.common.isSlowMode,
    slowModeTime: state.common.slowModeTime,
  };
};

enum Dialogs {
  IsLoading = 0,
  DuplicateCategory = 1,
}

const TabBarComponent: React.FC<ITabBarProps> = (props) => {
  const [showDrawer, setShowDrawer] = React.useState<boolean>(false);
  const [currentDialogs, setCurrentDialogs] = React.useState<Dialogs[]>([]);

  const classes = useTabBarStyles();
  const newCategoryKeyRef = React.useRef<string>();

  const dispatch = useDispatch();

  const toggleDrawer = (event: React.KeyboardEvent | React.MouseEvent) => {
    setShowDrawer(true);
  };

  const onNewTabClicked = (newCategory: Category) => {
    newCategoryKeyRef.current = newCategory.key;
    onCloseDrawer();
  };

  const onTransitionFinished = () => {
    if (newCategoryKeyRef.current) {
      dispatch(actions.categories.setCurrentCategory(newCategoryKeyRef.current));
    } else {
      // Previously, this state was indicative of a bug because there should be no way _not_ have a category selected
      // There is now a default state for an unselected category, so this should be a valid state
      // console.error("WARNING - newCategoryKeyRef is undefined");
    }
  };

  const onCreateNewTabBlur = async (text: string) => {
    if (text === "") {
      return;
    }
    if (props.categories.find((category) => category.displayName === text)) {
      openDialogs([Dialogs.DuplicateCategory]);
      return;
    }
    newCategoryKeyRef.current = uuidv4();
    openDialogs([Dialogs.IsLoading]);
    try {
      const _categories = await categories.createCategory(
        {
          displayName: text,
          key: newCategoryKeyRef.current,
          pathName: encodeURIComponent(text),
        },
        props.isSlowMode,
        props.slowModeTime
      );
      dispatch(actions.categories.setCategories(_categories));
      closeDialogs([Dialogs.IsLoading]);
      onCloseDrawer();
    } catch (error) {
      console.error(error);
      return;
    }
  };

  const onCloseDrawer = () => {
    setShowDrawer(false);
    props.onDrawerClose && props.onDrawerClose();
  };

  const closeDialogs = (dialogsToClose: Dialogs[]) => {
    setCurrentDialogs(currentDialogs.filter((dialog) => !dialogsToClose.includes(dialog)));
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
      <AppBar className={classes.appBar}>
        <Typography className={classes.activeTab} variant="button">
          {props.currentCategory.displayName}
        </Typography>
        <IconButton className={classes.menuButton} color="inherit" onClick={toggleDrawer}>
          <MenuIcon />
        </IconButton>
      </AppBar>

      <Dialog
        isOpen={showDrawer || !!props.showDrawer}
        onClose={(_, reason) => {
          onCloseDrawer();
        }}
        onTransitionFinished={() => onTransitionFinished()}
      >
        <AppBar className={classes.dialogAppBar}>
          <Button onClick={() => onCloseDrawer()} color="inherit">
            close
          </Button>
        </AppBar>
        <List component="nav" className={classes.tabListContainer}>
          {props.categories.map((category) => (
            <CategoryListItem onNewTabClicked={() => onNewTabClicked(category)} category={category} key={category.key} />
          ))}
          <Divider />
          <ListItem>
            <TypographyInput
              clearTextOnFirstEnter
              onBlur={onCreateNewTabBlur}
              defaultValue={newCategoryPlaceholder}
              resetOnBlur={true}
            />
          </ListItem>
        </List>
      </Dialog>
      <LoadingDialog dialogText={"Creating category..."} isOpen={currentDialogs.includes(Dialogs.IsLoading)} />
      <InformationDialog
        dialogText={"Categories must have a unique name"}
        isOpen={currentDialogs.includes(Dialogs.DuplicateCategory)}
        onClose={() => closeDialogs([Dialogs.DuplicateCategory])}
      />
    </>
  );
};

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
export const TabBar = connector(TabBarComponent);
