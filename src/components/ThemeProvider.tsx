"use client";
import { ReactNode } from "react";
import { ThemeProvider, createTheme } from "@mui/material";

const theme = createTheme({
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily:
            '"Mona Sans", "Helvetica Neue", Helvetica, Arial, sans-serif',
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
        h5: {
          fontSize: "1.7rem",
          fontWeight: 600,
        },
        h6: {
          fontSize: "1.2rem",
          fontWeight: 500,
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
          fontFamily:
            '"Mona Sans", "Helvetica Neue", Helvetica, Arial, sans-serif',
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
        outlined: {
          border: "1px solid white",
          borderRadius: "8px",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          background: "white",
          borderRadius: "4px",
          borderColor: "white",
          padding: 0,
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
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "white",
          fontFamily:
            '"Mona Sans", "Helvetica Neue", Helvetica, Arial, sans-serif',
          fontSize: "14px",
          marginBottom: "2px",
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          margin: 0,
          marginTop: "2px",
          fontFamily:
            '"Mona Sans", "Helvetica Neue", Helvetica, Arial, sans-serif',
          fontSize: "12px",
        },
      },
    }
  },
});

export default function CustomThemeProvider({
  children,
}: {
  children: ReactNode;
}) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
