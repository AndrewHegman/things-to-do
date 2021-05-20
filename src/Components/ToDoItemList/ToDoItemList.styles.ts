import { makeStyles, createStyles, Theme, fade } from "@material-ui/core/styles";

export const useToDoItemListStyles = makeStyles((theme: Theme) =>
  createStyles({
    contentContainer: {
      backgroundColor: theme.palette.background.default,
    },
  })
);
