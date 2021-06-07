import React from "react";
import { useMediaQuery } from "@material-ui/core";
import { MobileTabBar } from "./Mobile";
import { DesktopTabBar } from "./Desktop";
import { IBaseTabBarProps } from "./Common";

export const TabBar: React.FC<IBaseTabBarProps> = (props) => {
  const isNotMobile = useMediaQuery("(min-width: 600px)");

  if (isNotMobile) {
    return <DesktopTabBar {...props} />;
  }
  return <MobileTabBar {...props} />;
};
