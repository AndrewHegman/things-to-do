import React from "react";
import { IconButton, Typography, Dialog, Slide, Button, List, ListItem, ListItemText, InputBase } from "@material-ui/core";
import { Menu as MenuIcon } from "@material-ui/icons";
import { useTabBarStyles } from "./TabBar.styles";
import { AppBar } from "../../AppBar/AppBar";
import { IBaseTabBarProps } from "../Common";
import { useHistory } from "react-router-dom";
import { TransitionProps } from "@material-ui/core/transitions/transition";

const newCategoryPlaceholder = "New Category...";

const Transition = React.forwardRef(function Transition(props: TransitionProps & { children?: React.ReactElement }, ref: React.Ref<unknown>) {
  return <Slide direction="down" ref={ref} {...props} />;
});

interface ITabBarProps extends IBaseTabBarProps {}

export const TabBar: React.FC<ITabBarProps> = (props) => {
  const [showDrawer, setShowDrawer] = React.useState<boolean>(false);
  const [isEditingNewCategory, setIsEditingNewCategory] = React.useState<boolean>(false);
  const [newCategoryName, setNewCategoryName] = React.useState<string>(newCategoryPlaceholder);
  const classes = useTabBarStyles();
  const history = useHistory();
  const newCategoryRef = React.useRef<string>("");
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

  const onNewTabClicked = (newTab: string) => {
    newCategoryRef.current = newTab;
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
    if (newCategoryRef.current && newCategoryRef.current !== history.location.pathname) {
      history.push(newCategoryRef.current);
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

      <Dialog
        fullScreen
        open={showDrawer}
        onClose={() => setShowDrawer(false)}
        TransitionComponent={Transition}
        TransitionProps={{ onExited: onTransitionFinished }}
      >
        <AppBar className={classes.dialogAppBar}>
          <Button onClick={() => setShowDrawer(false)} color="inherit">
            close
          </Button>
        </AppBar>
        <List component="nav">
          {props.categories.map((category) => (
            <ListItem button onClick={() => onNewTabClicked(category.pathName)} key={category.pathName}>
              <InputBase value={category.displayName} readOnly />
            </ListItem>
          ))}
          <ListItem onClick={() => onCreateNewTabClicked()}>
            <InputBase
              value={newCategoryName}
              readOnly={!isEditingNewCategory}
              onChange={(event) => setNewCategoryName(event.target.value)}
              onBlur={onCreateNewTabBlur}
            />
          </ListItem>
          {/* {isEditingNewCategory && <InputBase inputRef={createNewCategoryRef} placeholder="Search…" onBlur={() => setIsEditingNewCategory(false)} />} */}
        </List>
      </Dialog>
    </>
  );
};
