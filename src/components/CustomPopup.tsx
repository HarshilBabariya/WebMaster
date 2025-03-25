"use client";
import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
} from "@mui/material";

export default function CustomPopup({
  open,
  handleClose,
  children,
  actions,
}: {
  open: boolean;
  handleClose: () => void;
  children: React.ReactNode;
  actions: React.ReactNode;
}) {
  return (
    <Dialog
      open={open}
      keepMounted
      onClose={handleClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
      fullWidth
    >
      <DialogContent>{children}</DialogContent>
      <DialogActions>{actions}</DialogActions>
    </Dialog>
  );
}
