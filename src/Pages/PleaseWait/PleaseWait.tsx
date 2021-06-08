import React from "react";
import { useHistory } from "react-router";

/**
 *  THIS FILE SHOULD BE DEPRECATED AND BURNED ASAP
 * This is just a temporary fix to help keep me on track and not get sidetracked by useless features...
 */

interface IPleaseWaitProps {
  promise: Promise<any>;
  resolveRoute: string;
  rejectRoute: string;
}

export const PleaseWait: React.FC<IPleaseWaitProps> = (props) => {
  const history = useHistory();

  props.promise
    .then(() => {
      history.push(props.resolveRoute);
    })
    .catch(() => {
      history.push(props.rejectRoute);
    });

  return <div>Loading...please wait...</div>;
};
