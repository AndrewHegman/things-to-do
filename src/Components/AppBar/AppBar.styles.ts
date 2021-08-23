import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

export const useAppBarStyles = makeStyles((theme: Theme) => {
  return createStyles({
    appBarSpacer: {
      ...theme.mixins.toolbar,
    },
  });
});
