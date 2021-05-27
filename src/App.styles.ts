import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

export const useAppStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      marginTop: `${theme.spacing(2)}px`,
      marginBottom: `${theme.spacing(2)}px`,
    },
  })
);
