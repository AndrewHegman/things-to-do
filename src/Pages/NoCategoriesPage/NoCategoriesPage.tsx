import { Button, Container, Typography } from "@material-ui/core";
import React from "react";
import { TabBar } from "../../Components/TabBar";
import { useNoCategoriesPageStyles } from "./NoCategoriesPage.styles";

export interface INoCategoriesPageProps {}

export const NoCategoriesPage: React.FC<INoCategoriesPageProps> = (props) => {
  const classes = useNoCategoriesPageStyles();
  const [showDrawer, setShowDrawer] = React.useState<boolean>(false);

  return (
    <>
      <TabBar
        showDrawer={showDrawer}
        onDrawerClose={() => {
          console.log("here");
          setShowDrawer(false);
        }}
      />
      <Container className={classes.contentContainer}>
        <Typography style={{ textAlign: "center" }}>
          It looks like you don't have any categories yet or you haven't selected one yet.
        </Typography>
        &nbsp;
        <Typography style={{ textAlign: "center" }}>
          Click the button below to create a new category or select an existing one.
        </Typography>
        &nbsp;
        <Button onClick={() => setShowDrawer(true)}>Click here to get started</Button>
      </Container>
    </>
  );
};
