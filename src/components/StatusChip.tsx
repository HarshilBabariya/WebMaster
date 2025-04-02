import { Chip, TableCell } from "@mui/material";
import React, { useState } from "react";

const StatusChip = ({ initialStatus }: { initialStatus: string }) => {
  const [status, setStatus] = useState(initialStatus);

  const toggleStatus = () => {
    setStatus((prev) => (prev === "Active" ? "Inactive" : "Active"));
  };

  return (
    <Chip
      label={status}
      onClick={toggleStatus}
      sx={{
        cursor: "pointer",
        backgroundColor: status === "Active" ? "#aee2ae" : "#efc4c4",
        color: status === "Active" ? "green" : "red",
        fontWeight: 700,
        "&:hover": {
          backgroundColor: status === "Active" ? "#aee2ae" : "#efc4c4",
          color: status === "Active" ? "green" : "red",
        },
      }}
    />
  );
};

export default StatusChip;
