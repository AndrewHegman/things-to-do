import React from "react";
import { IconButton, Typography, Button, List, ListItem, InputBase, Divider } from "@material-ui/core";
import { Menu as MenuIcon } from "@material-ui/icons";
import { useTabBarStyles } from "./TabBar.styles";
import { AppBar } from "../../AppBar/AppBar";
import { IBaseTabBarProps } from "../Common";
import { useHistory } from "react-router-dom";
import { Dialog } from "../../Dialog/Dialog";
import { actions } from "../../../Redux/Common/commonActions";
import { Category } from "../../../Interface/Category";
import { TypographyInput } from "../../TypographyInput";
import { createCategory } from "../../../API/MockFetch";

const newCategoryPlaceholder = "New Category...";

interface ITabBarProps extends IBaseTabBarProps {}

export const TabBar: React.FC<ITabBarProps> = (props) => {
  const [showDrawer, setShowDrawer] = React.useState<boolean>(false);
  const classes = useTabBarStyles();
  const history = useHistory();
  const newCategoryKeyRef = React.useRef<string>();

  const toggleDrawer = (event: React.KeyboardEvent | React.MouseEvent) => {
    setShowDrawer(true);
  };

  const onNewTabClicked = (newCategoryKey: string) => {
    newCategoryKeyRef.current = newCategoryKey;
    setShowDrawer(false);
  };

  const onTransitionFinished = () => {
    if (newCategoryKeyRef.current && newCategoryKeyRef.current !== props.currentCategory.key) {
      // history.push(newCategoryKeyRef.current.pathName);
      props.onChangeCategory(newCategoryKeyRef.current);
    }
  };

  const onCreateNewTabBlur = (text: string) => {
    // This should be safe from creating a category with the default name since the input automatically clears the text on enter
    createCategory({
      displayName: text,
      pathName: `/${text}`,
    })
      .then((category) => {
        onNewTabClicked(category.key);
      })
      .catch((err) => console.error(err));
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

      <Dialog isOpen={showDrawer} onClose={() => setShowDrawer(false)} onTransitionFinished={onTransitionFinished}>
        <AppBar className={classes.dialogAppBar}>
          <Button onClick={() => setShowDrawer(false)} color="inherit">
            close
          </Button>
        </AppBar>
        <List component="nav">
          {props.categories.map((category) => (
            <ListItem button onClick={() => onNewTabClicked(category.key)} key={category.pathName}>
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
