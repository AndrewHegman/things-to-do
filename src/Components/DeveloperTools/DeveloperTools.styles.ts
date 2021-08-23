import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

export const useDeveloperToolsStyles = makeStyles((theme: Theme) => {
  console.log(theme);
  return createStyles({
    button: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
    },
    slowModeToggle: {
      textTransform: "none",
    },
    slowModeTimeInput: {
      width: `${theme.typography.fontSize * 6}px`,
    },
    container: {
      display: "flex",
      flexDirection: "column",
    },
    settingsContainer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
  });
});
