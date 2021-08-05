import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

export const useCategoryListItemStyles = makeStyles((theme: Theme) => {
  return createStyles({
    tab: {
      display: "flex",
      justifyContent: "space-between",
    },
  });
});
