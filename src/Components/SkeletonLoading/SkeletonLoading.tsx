import { Card } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import React from "react";

export const SkeletonLoading: React.FC<{}> = (props) => {
  return (
    <Card>
      <Skeleton variant="text" width={"20%"} />
      <Skeleton variant="rect" width={"80%"} />
      <Skeleton variant="text" width={"40%"} />
    </Card>
  );
};
