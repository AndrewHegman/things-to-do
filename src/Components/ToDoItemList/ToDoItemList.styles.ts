import { makeStyles, createStyles, Theme, fade } from "@material-ui/core/styles";

export const useToDoItemListStyles = makeStyles((theme: Theme) => {
  const defaultStyles = {
    // backgroundColor: theme.palette.background.default,
    backgroundColor: "wheat",

    height: "100%",
    display: "flex",
    paddingTop: `calc(${theme.spacing(2)}px + ${theme.mixins.toolbar.minHeight}px)`,
  };

  return createStyles({
    contentContainer_dataLoading: {
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
