import React from "react";
import { Button, Drawer } from "@material-ui/core";
import { useDeveloperToolsStyles } from "./DeveloperTools.styles";
import { getSlowMode, toggleSlowMode } from "../../API/MockFetch";

export const DeveloperTools: React.FC<{}> = () => {
  const [showDrawer, setShowDrawer] = React.useState<boolean>(false);
  const [slowMode, setSlowMode] = React.useState<boolean>(getSlowMode());

  const classes = useDeveloperToolsStyles();

  const handleSlowModeToggle = () => {
    toggleSlowMode();
    setSlowMode(getSlowMode());
  };

  return (
    <>
      <Button onClick={() => setShowDrawer(true)} fullWidth>
        Developer Tools
      </Button>
      <Drawer anchor={"bottom"} open={showDrawer} onClose={() => setShowDrawer(false)}>
        <Button onClick={() => handleSlowModeToggle()}>Slow mode: {slowMode.toString()}</Button>
      </Drawer>
    </>
  );
};
