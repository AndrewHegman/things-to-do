import { makeStyles, createStyles, Theme, fade } from "@material-ui/core/styles";

export const useDeveloperToolsStyles = makeStyles((theme: Theme) => {
  return createStyles({
    button: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
    },
  });
});
