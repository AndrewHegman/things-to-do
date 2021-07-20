import React from "react";
import { IconButton, Typography, Button, List, ListItem, InputBase, Divider } from "@material-ui/core";
import { Menu as MenuIcon } from "@material-ui/icons";
import { useTabBarStyles } from "./TabBar.styles";
import { AppBar } from "../../AppBar/AppBar";
import { IBaseTabBarProps } from "../Common";
import { useHistory, useRouteMatch } from "react-router-dom";
import { Dialog } from "../../Dialog/Dialog";
import { Category } from "../../../Interface/Category";
import { TypographyInput } from "../../TypographyInput";
import { IMatchParameters, IRouterState } from "../../../Interface/Router";
import { v4 as uuidv4 } from "uuid";
import { connect, ConnectedProps, useDispatch } from "react-redux";
import { RootState } from "../../../Redux/store";
import { actions } from "../../../Redux";

const newCategoryPlaceholder = "New Category...";

interface ITabBarProps extends IBaseTabBarProps, PropsFromRedux {}

const mapStateToProps = (state: RootState) => {
  return {
    categories: state.categories.categories,
    currentCategory: state.categories.currentCategory,
  };
};

const TabBarComponent: React.FC<ITabBarProps> = (props) => {
  const [showDrawer, setShowDrawer] = React.useState<boolean>(false);
  const classes = useTabBarStyles();
  const history = useHistory<IRouterState>();
  const newCategoryKeyRef = React.useRef<Category>();
  const dispatch = useDispatch();

  const match = useRouteMatch<IMatchParameters>();

  const toggleDrawer = (event: React.KeyboardEvent | React.MouseEvent) => {
    setShowDrawer(true);
  };

  const onNewTabClicked = (newCategoryKey: Category) => {
    newCategoryKeyRef.current = newCategoryKey;
    setShowDrawer(false);
  };

  const onTransitionFinished = () => {
    if (newCategoryKeyRef.current) {
      dispatch(actions.categories.setCurrentCategory(newCategoryKeyRef.current!));
    } else {
      console.warn("WARNING - newCategoryKeyRef is undefined");
    }
  };

  const onCreateNewTabBlur = (text: string) => {
    console.error("Save off newly created UUID. Check for dispatch error");
    dispatch(
      actions.categories.createCategory(
        {
          displayName: text,
          key: uuidv4(),
        },
        false
      )
    );
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
            <TypographyInput clearTextOnFirstEnter onBlur={onCreateNewTabBlur} defaultValue={newCategoryPlaceholder} />
          </ListItem>
        </List>
      </Dialog>
    </>
  );
};

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
export const TabBar = connector(TabBarComponent);
