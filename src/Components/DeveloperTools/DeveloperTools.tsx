import React, { ChangeEvent, ReactNode } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
  Typography,
} from "@material-ui/core";
import { useDeveloperToolsStyles } from "./DeveloperTools.styles";
import { connect, ConnectedProps, useDispatch } from "react-redux";
import { RootState } from "../../Redux/store";
import { actions } from "../../Redux";
import { BackendEndpoint } from "../../Interface/Endpoints";

interface IDeveloperToolsProps extends PropsFromRedux {}

const mapStateToProps = (state: RootState) => ({
  isSlowMode: state.common.isSlowMode,
  slowModeTime: state.common.slowModeTime,
  backendEndpoint: state.common.backendEndpoint,
});

const DeveloperToolsComponent: React.FC<IDeveloperToolsProps> = (props) => {
  const [showDialog, setShowDialog] = React.useState<boolean>(false);
  const [localSlowModeTime, setLocalSlowModeTime] = React.useState<string>(`${props.slowModeTime}`);
  const [errorText, setErrorText] = React.useState<string>("");

  const dispatch = useDispatch();

  const classes = useDeveloperToolsStyles();

  const toggleSlowMode = () => {
    dispatch(actions.setSlowMode(!props.isSlowMode));
  };

  const onChangeSlowModeTime = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value } = event.target;

    if (parseInt(value) <= 0) {
      setErrorText("Delay must be at least 0");
    } else {
      setErrorText("");
    }

    setLocalSlowModeTime(value);
  };

  const onBlurSlowModeTime = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    dispatch(actions.setSlowModeTime(parseInt(event.target.value)));
  };

  const onBackendSelectChange = (event: ChangeEvent<{ name?: string | undefined; value: unknown }>, child: ReactNode) => {
    dispatch(actions.setBackendEndpoint(event.target.value as BackendEndpoint));
  };

  return (
    <>
      <Button onClick={() => setShowDialog(true)} fullWidth>
        Developer Tools
      </Button>
      <Dialog open={showDialog} onClose={() => setShowDialog(false)}>
        <DialogTitle>Developer Tools</DialogTitle>
        <DialogContent>
          <div className={classes.container}>
            <div className={classes.settingsContainer}>
              <Typography variant="h6" component="h2">
                Slow Mode
              </Typography>
              <Switch checked={props.isSlowMode} onChange={toggleSlowMode} name="slowMode" />
            </div>
            {props.isSlowMode && (
              <TextField
                label={"Delay"}
                onChange={onChangeSlowModeTime}
                onBlur={onBlurSlowModeTime}
                value={localSlowModeTime}
                type="number"
                error={errorText !== ""}
                helperText={errorText}
                InputProps={{
                  endAdornment: <InputAdornment position="start">ms</InputAdornment>,
                }}
              />
            )}
            <div style={{ marginTop: "10px" }}>
              <InputLabel shrink id="backend-endpoint-select-label1">
                Backend
              </InputLabel>
              <Select
                displayEmpty
                style={{ marginLeft: "10px" }}
                labelId="backend-endpoint-select-label"
                value={props.backendEndpoint}
                onChange={onBackendSelectChange}
              >
                {Object.entries(BackendEndpoint).map((endpoint) => {
                  return (
                    <MenuItem key={endpoint[0]} value={endpoint[1]}>
                      {endpoint[1]}
                    </MenuItem>
                  );
                })}
              </Select>
            </div>
          </div>
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
