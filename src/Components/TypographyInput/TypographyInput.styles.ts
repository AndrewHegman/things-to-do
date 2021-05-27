import { makeStyles, Theme } from "@material-ui/core/styles";
import { Variant } from "@material-ui/core/styles/createTypography";

export const useTypographyInputStyles = (variant: Variant) =>
  makeStyles((theme: Theme) => ({
    inputTypography: {
      ...(theme.typography as any)[variant],
    },
  }));
