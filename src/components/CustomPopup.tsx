"use client";
import * as React from "react";
import { Dialog, DialogContent, DialogActions } from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

export default function CustomPopup({
  open,
  handleClose,
  children,
  actions,
  sx,
}: {
  open: boolean;
  handleClose: () => void;
  children: React.ReactNode;
  actions: React.ReactNode;
  sx: any;
}) {
  return (
    <Dialog open={open}>
      <CloseRoundedIcon
        sx={{
          position: "absolute",
          top: 20,
          right: 20,
          cursor: "pointer",
        }}
        onClick={handleClose}
      />
      <DialogContent sx={sx}>{children}</DialogContent>
      <DialogActions>{actions}</DialogActions>
    </Dialog>
  );
}
