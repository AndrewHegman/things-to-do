import { CircularProgress, Dialog, Typography } from "@mui/material";
import React from "react";
import { useStore } from "../store";
import { Modal } from "../store/modals";

export const LoadingModal: React.FC = () => {
  const { modals, message } = useStore();

  return (
    <Dialog open={modals.includes(Modal.Loading)}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <CircularProgress sx={{ margin: "30px 15px 15px 15px" }} size={60} color="secondary" />
        <Typography sx={{ margin: "15px" }} fontSize={24}>
          {message || "Loading, please wait"}
        </Typography>
      </div>
    </Dialog>
  );
};
