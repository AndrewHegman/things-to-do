import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

export const useAddNewToDoItemButtonStyles = makeStyles((theme: Theme) =>
  createStyles({
    floatingActionButton: {
      margin: 0,
      top: "auto",
      right: 20,
      bottom: 20,
      left: "auto",
      position: "fixed",
    },
  })
);
