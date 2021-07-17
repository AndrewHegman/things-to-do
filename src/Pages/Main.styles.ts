import { makeStyles, createStyles, Theme, fade } from "@material-ui/core/styles";

export const useMainStyles = makeStyles((theme: Theme) =>
  createStyles({
    contentContainer: {
      backgroundColor: theme.palette.background.default,
      height: "100%",
      display: "flex",
      flexDirection: "column",
    },
  })
);
