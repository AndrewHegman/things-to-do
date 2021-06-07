import { makeStyles, createStyles, Theme, fade } from "@material-ui/core/styles";

export const useTabBarStyles = makeStyles((theme: Theme) => {
  return createStyles({
    activeTab: {
      ...theme.typography.button,
      padding: theme.spacing(1),
      fontWeight: theme.typography.fontWeightMedium,
      textAlign: "center",
      fontSize: 22,
    },
    appBar: {
      position: "fixed",
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      marginBottom: theme.spacing(2),
    },
    menuButton: {
      marginLeft: "auto",
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
    },
    dialogAppBar: {
      display: "flex",
      flexDirection: "row-reverse",
      justifyContent: "space-between",
    },
    contentContainer: {
      backgroundColor: theme.palette.background.default,
      ...theme.mixins.toolbar,
    },
    appBarSpacer: {
      ...theme.mixins.toolbar,
    },
    search: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(3),
        width: "auto",
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    inputRoot: {
      color: "inherit",
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: "20ch",
      },
    },
  });
});
