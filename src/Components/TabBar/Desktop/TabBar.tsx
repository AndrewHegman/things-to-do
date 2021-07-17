import React from "react";
import { Tabs, Tab } from "@material-ui/core";
import { AppBar } from "../../AppBar/AppBar";
import { IBaseTabBarProps } from "../Common";
import { Category } from "../../../Interface/Category";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../../Redux/store";

interface ITabBarProps extends IBaseTabBarProps, PropsFromRedux {}

const mapStateToProps = (state: RootState) => {
  return {
    categories: state.categories.categories,
  };
};

const TabBarComponent: React.FC<ITabBarProps> = (props) => {
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

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
export const TabBar = connector(TabBarComponent);
