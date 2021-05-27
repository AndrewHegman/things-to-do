import { makeStyles, Theme } from "@material-ui/core/styles";

export const useCreateNewToDoItemDialogStyles = makeStyles((theme: Theme) => ({
  dialogAppBar: {
    display: "flex",
    flexDirection: "row-reverse",
    justifyContent: "space-between",
  },
  activeTab: {
    ...theme.typography.button,
    padding: theme.spacing(1),
    fontWeight: theme.typography.fontWeightMedium,
    textAlign: "center",
    fontSize: 22,
  },
}));
