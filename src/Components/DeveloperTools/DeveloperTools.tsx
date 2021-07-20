import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Drawer,
  FormControlLabel,
  FormGroup,
  Input,
  InputAdornment,
  Switch,
  TextField,
} from "@material-ui/core";
import { useDeveloperToolsStyles } from "./DeveloperTools.styles";
import { connect, ConnectedProps, useDispatch } from "react-redux";
import { RootState } from "../../Redux/store";
import { actions } from "../../Redux";

interface IDeveloperToolsProps extends PropsFromRedux {}

const mapStateToProps = (state: RootState) => ({
  isSlowMode: state.common.isSlowMode,
  slowModeTime: state.common.slowModeTime,
});

const DeveloperToolsComponent: React.FC<IDeveloperToolsProps> = (props) => {
  const [showDialog, setShowDialog] = React.useState<boolean>(false);
  const dispatch = useDispatch();

  const classes = useDeveloperToolsStyles();

  const toggleSlowMode = () => {
    dispatch(actions.setSlowMode(!props.isSlowMode));
  };

  return (
    <>
      <Button onClick={() => setShowDialog(true)} fullWidth>
        Developer Tools
      </Button>
      <Dialog open={showDialog} onClose={() => setShowDialog(false)}>
        <DialogTitle>Developer Tools</DialogTitle>
        <DialogContent>
          <FormGroup className={classes.container}>
            <FormControlLabel
              control={<Switch checked={props.isSlowMode} onChange={toggleSlowMode} name="slowMode" />}
              label="Slow mode"
              labelPlacement="start"
            />
            <FormControlLabel
              value={props.slowModeTime}
              control={<Input type="number" endAdornment={<InputAdornment position="end">ms</InputAdornment>} />}
              label="Delay time"
              labelPlacement="start"
            />
          </FormGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export const DeveloperTools = connector(DeveloperToolsComponent);
