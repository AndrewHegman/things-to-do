import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

export const useNoCategoriesPageStyles = makeStyles((theme: Theme) => {
  const defaultStyles = {
    backgroundColor: theme.palette.background.default,

    height: "100%",
    display: "flex",
    paddingTop: `calc(${theme.spacing(2)}px + ${theme.mixins.toolbar.minHeight}px)`,
    minHeight: "100vh",
  };

  return createStyles({
    contentContainer: {
      ...defaultStyles,
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
    contentContainer_dataLoaded: {
      ...defaultStyles,
      flexDirection: "column",
      justifyContent: "space-between",
    },
  });
});
