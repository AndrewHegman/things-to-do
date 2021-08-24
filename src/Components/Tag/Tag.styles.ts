import { makeStyles, Theme } from "@material-ui/core/styles";

export const useTagStyles = makeStyles((theme: Theme) => ({
  chip: (props: { isSelected: boolean }) => ({
    color: props.isSelected ? "#faf7f5" : "grey",
  }),
}));
