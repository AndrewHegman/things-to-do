import React from "react";
import { Card, CardContent, Typography, Divider } from "@material-ui/core";
import { useToDoItemStyles } from "./ToDoItem.styles";
import { Info as InfoButton, Delete as DeleteIcon, Edit as EditIcon } from "@material-ui/icons";
import { ICreatingNewToDoItemProps } from "../Common";
import { TypographyInput } from "../../TypographyInput/TypographyInput";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../../Redux/store";

interface IMobileCreatingNewToDoItem extends ICreatingNewToDoItemProps, PropsFromRedux {}

const mapStateToProps = (state: RootState) => ({
  currentCategory: state.categories.currentCategory,
});

const CreatingNewToDoItemComponent: React.FC<IMobileCreatingNewToDoItem> = (props) => {
  const [isDirty, setIsDirty] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const cardRef = React.useRef<HTMLDivElement>(null);

  const { onSubmit } = props;
  const classes = useToDoItemStyles();

  React.useEffect(() => {
    inputRef.current?.focus();
  }, [inputRef]);

  React.useEffect(() => {
    cardRef.current?.scrollIntoView();
  }, [cardRef]);

  return (
    <Card className={classes.root} ref={cardRef}>
      <CardContent>
        <div className={classes.contentContainer}>
          <div className={classes.infoContainer}>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
              {props.currentCategory.displayName}
            </Typography>
            <TypographyInput placeholder={"Enter name..."} clearTextOnFirstEnter onBlur={onSubmit} onChange={() => setIsDirty(true)} ref={inputRef} />
          </div>
          <div className={classes.actionsContainer}>
            <EditIcon />
            <Divider />
            <InfoButton />
            <Divider />
            <DeleteIcon />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
export const CreatingNewToDoItem = connector(CreatingNewToDoItemComponent);
