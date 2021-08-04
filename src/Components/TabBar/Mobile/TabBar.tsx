import React from "react";
import {
  IconButton,
  Typography,
  Button,
  List,
  ListItem,
  Divider,
  Dialog as MuiDialog,
  CircularProgress,
} from "@material-ui/core";
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

const TabBarComponent: React.FC<ITabBarProps> = (props) => {
  const [showDrawer, setShowDrawer] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const classes = useTabBarStyles();
  const newCategoryKeyRef = React.useRef<string>();

  const dispatch = useDispatch();

  const toggleDrawer = (event: React.KeyboardEvent | React.MouseEvent) => {
    setShowDrawer(true);
  };

  const onNewTabClicked = (newCategory: Category) => {
    newCategoryKeyRef.current = newCategory.key;
    setShowDrawer(false);
  };

  const onTransitionFinished = () => {
    if (newCategoryKeyRef.current) {
      dispatch(actions.categories.setCurrentCategory(newCategoryKeyRef.current));
    } else {
      console.error("WARNING - newCategoryKeyRef is undefined");
    }
  };

  const onCreateNewTabBlur = async (text: string) => {
    if (props.categories.find((category) => category.displayName === text)) {
      console.error("Categories must have a valid name");
      return;
    }
    newCategoryKeyRef.current = uuidv4();
    setIsLoading(true);
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
      setIsLoading(false);
      setShowDrawer(false);
    } catch (error) {
      console.error(error);
      return;
    }
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

      <Dialog isOpen={showDrawer} onClose={() => setShowDrawer(false)} onTransitionFinished={() => onTransitionFinished()}>
        <AppBar className={classes.dialogAppBar}>
          <Button onClick={() => setShowDrawer(false)} color="inherit">
            close
          </Button>
        </AppBar>
        <List component="nav" className={classes.tabListContainer}>
          {props.categories.map((category) => (
            <ListItem button onClick={() => onNewTabClicked(category)} key={category.key}>
              <Typography variant={"h5"} component={"h2"}>
                {category.displayName}
              </Typography>
            </ListItem>
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

      <MuiDialog open={isLoading} fullScreen={false}>
        <div className={classes.loadingDialog}>
          <CircularProgress />
          <Typography>Creating category...</Typography>
        </div>
      </MuiDialog>
    </>
  );
};

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
export const TabBar = connector(TabBarComponent);
