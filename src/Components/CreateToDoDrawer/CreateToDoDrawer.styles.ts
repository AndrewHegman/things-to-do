import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

export const useCreateToDoDrawerStyles = makeStyles((theme: Theme) => {
  return createStyles({
    dialogAppBar: {
      display: "flex",
      flexDirection: "row-reverse",
      justifyContent: "space-between",
    },
    contentContainer: {
      paddingTop: `calc(${theme.spacing(1)}px + ${theme.mixins.toolbar.minHeight}px)`,
      padding: theme.spacing(0, 0, 0, 2),
      display: "flex",
      flexDirection: "column",
    },
    tagContainer: {
      paddingTop: theme.spacing(2),
      display: "flex",
      flexWrap: "wrap",
    },
  });
});
