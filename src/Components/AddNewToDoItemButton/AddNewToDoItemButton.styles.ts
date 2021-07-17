import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

export const useAddNewToDoItemButtonStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      minWidth: 275,
      marginBottom: theme.spacing(2),
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
    },
  })
);
