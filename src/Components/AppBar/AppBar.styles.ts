import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

export const useAppBarStyles = makeStyles((theme: Theme) => {
  console.log(theme);
  console.log(theme.mixins.gutters());
  console.log(theme.spacing(2));
  return createStyles({
    appBarSpacer: {
      ...theme.mixins.toolbar,
    },
  });
});
