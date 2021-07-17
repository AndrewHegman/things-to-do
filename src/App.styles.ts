import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

export const useAppStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      // paddingTop: `${theme.mixins.toolbar.minHeight}px`,
      // paddingBottom: `${theme.spacing(2)}px`,
      // height: `calc(100vh)`,
      border: "1px solid red",
      paddingLeft: "0px",
      paddingRight: "0px",
    },
  })
);
