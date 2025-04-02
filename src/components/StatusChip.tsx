import { Chip } from "@mui/material";

const StatusChip = ({
  status,
  onToggle,
}: {
  status: string;
  onToggle: () => void;
}) => {
  return (
    <Chip
      label={status}
      onClick={onToggle}
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
