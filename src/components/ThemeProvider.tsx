"use client";
import { ThemeProvider, createTheme } from "@mui/material";
import { ReactNode } from "react";

const theme = createTheme({
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: "system-ui, sans-serif",
        },
        h1: {
          fontSize: "60px",
          fontWeight: 600,
        },
        h2: {
          fontSize: "clamp(3rem, 10vw, 2.15rem)",
          fontWeight: 700,
        },
        h3: {
          fontSize: "clamp(2rem, 10vw, 2.15rem)",
          fontWeight: 600,
        },
        body1: {
          fontSize: "clamp(1rem, 10vw, 0.5rem)",
        },
        caption: {
          fontSize: "14px",
          color: "grey",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: "system-ui, sans-serif",
          textTransform: "initial",
          color: "white",
          fontWeight: 600,
        },
        contained: {
          backgroundColor: "white",
          color: "black",
          borderRadius: "20px",
        },
        text: {
          color: "white",
          "&:hover": {
            color: "#AAAAAA",
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          background: "white",
          borderRadius: "4px",
          borderColor: "white",
        },
        input: {
          padding: "12.5px 14px",
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: "#AAAAAA",
        },
      },
    },
    MuiTableSortLabel: {
      styleOverrides: {
        root: {
          color: "black !important",
          fontWeight: 600,
          "&:hover": {
            color: "black",
          },
        },
        icon: {
          color: "black !important",
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          color: "white",
          "&:hover": {
            color: "white",
          },
        },
      },
    },
  },
});

export default function CustomThemeProvider({
  children,
}: {
  children: ReactNode;
}) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
