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

const newCategoryPlaceholder = "New Category...";

interface ITabBarProps extends IBaseTabBarProps {}

export const TabBar: React.FC<ITabBarProps> = (props) => {
  const [showDrawer, setShowDrawer] = React.useState<boolean>(false);
  const [isEditingNewCategory, setIsEditingNewCategory] = React.useState<boolean>(false);
  const [newCategoryName, setNewCategoryName] = React.useState<string>(newCategoryPlaceholder);
  const classes = useTabBarStyles();
  const history = useHistory();
  const newCategoryKeyRef = React.useRef<string>();
  const createNewCategoryRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    // This ensures that the component is rendered before we focus
    if (isEditingNewCategory) {
      createNewCategoryRef.current?.focus();
    }
  }, [isEditingNewCategory]);

  const toggleDrawer = (event: React.KeyboardEvent | React.MouseEvent) => {
    setShowDrawer(true);
  };

  const onNewTabClicked = (newCategoryKey: string) => {
    newCategoryKeyRef.current = newCategoryKey;
    setShowDrawer(false);
  };

  const onCreateNewTabClicked = () => {
    // This is a bit hacky...should probably just monitor
    // if the input has ever been changed.
    if (newCategoryName === newCategoryPlaceholder) {
      setNewCategoryName("");
    }
    setIsEditingNewCategory(true);
  };

  const onTransitionFinished = () => {
    if (newCategoryKeyRef.current && newCategoryKeyRef.current !== props.currentCategory.key) {
      // history.push(newCategoryKeyRef.current.pathName);
      props.onChangeCategory(newCategoryKeyRef.current);
    }
  };

  const onCreateNewTabBlur = () => {
    setIsEditingNewCategory(false);
    if (newCategoryName === "") {
      setNewCategoryName(newCategoryPlaceholder);
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
          <ListItem onClick={onCreateNewTabClicked}>
            <TypographyInput clearTextOnFirstEnter onBlur={onCreateNewTabBlur} defaultValue={newCategoryPlaceholder} />
          </ListItem>
        </List>
      </Dialog>
    </>
  );
};
