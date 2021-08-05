import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

export const useLoadingDialogStyles = makeStyles((theme: Theme) => {
  return createStyles({
    loadingDialog: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      margin: "10px",
    },
  });
});
