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
import { createCategory } from "../../../API/MockFetch";
import { IMatchParameters, IRouterState } from "../../../Interface/Router";

const newCategoryPlaceholder = "New Category...";

interface ITabBarProps extends IBaseTabBarProps {}

export const TabBar: React.FC<ITabBarProps> = (props) => {
  const [showDrawer, setShowDrawer] = React.useState<boolean>(false);
  const classes = useTabBarStyles();
  const history = useHistory<IRouterState>();
  const newCategoryKeyRef = React.useRef<Category>();

  const match = useRouteMatch<IMatchParameters>();

  const toggleDrawer = (event: React.KeyboardEvent | React.MouseEvent) => {
    setShowDrawer(true);
  };

  const onNewTabClicked = (newCategoryKey: Category) => {
    newCategoryKeyRef.current = newCategoryKey;
    setShowDrawer(false);
  };

  const onTransitionFinished = () => {
    if (newCategoryKeyRef.current && newCategoryKeyRef.current.key !== match.params.category) {
      history.push(newCategoryKeyRef.current.pathName);
    }
  };

  const onCreateNewTabBlur = (text: string) => {
    // This should be safe from creating a category with the default name since the input automatically clears the text on enter
    createCategory({
      displayName: text,
      pathName: `/${text.toLowerCase()}`,
    })
      .then((category) => {
        newCategoryKeyRef.current = category;
        setShowDrawer(false);
        // Need to redirect here and update ListItems page to show loading spinner
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <AppBar className={classes.appBar}>
        <Typography className={classes.activeTab} variant="button">
          {match.params.category}
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
        <List component="nav">
          {props.categories.map((category) => (
            <ListItem button onClick={() => onNewTabClicked(category)} key={category.pathName}>
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
