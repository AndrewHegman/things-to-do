import { makeStyles, Theme } from "@material-ui/core/styles";

export const useCreateNewToDoItemStyles = makeStyles((theme: Theme) => ({
  root: {
    minWidth: 275,
    marginBottom: theme.spacing(2),
  },

  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 6,
    marginTop: 6,
  },
  tags: {
    marginLeft: 2,
    marginRight: 2,
  },
  contentContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  infoContainer: {},
  actionsContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  dialogAppBar: {
    display: "flex",
    flexDirection: "row-reverse",
    justifyContent: "space-between",
  },
  text: {
    fontSize: "16px",
  },
}));
