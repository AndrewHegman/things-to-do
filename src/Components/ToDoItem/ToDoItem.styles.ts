import { makeStyles, Theme } from "@material-ui/core/styles";

export const useToDoItemStyles = makeStyles((theme: Theme) => ({
  root: {
    minWidth: 275,
    marginBottom: theme.spacing(2),
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
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
}));
