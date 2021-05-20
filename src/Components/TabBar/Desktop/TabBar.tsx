import React from "react";
import { Tabs, Tab } from "@material-ui/core";
import { getCategories } from "../../../API/MockFetch";

import { AppBar } from "../../AppBar/AppBar";
import { IBaseTabBarProps } from "../Common";
import { Category } from "../../../Interface/Category";

interface ITabBarProps extends IBaseTabBarProps {}

export const TabBar: React.FC<ITabBarProps> = (props) => {
  const [activeTab, setActiveTab] = React.useState<number>(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <AppBar>
      <Tabs value={activeTab} onChange={handleChange}>
        {props.categories.map((category) => (
          <Tab key={category.pathName} label={category.displayName} />
        ))}
      </Tabs>
    </AppBar>
  );
};
