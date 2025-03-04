"use client";

import { DialogTitle, Dialog as MuiDialog, styled } from "@mui/material";

const StyledDialog = styled(MuiDialog)(({ theme }) => ({
  "& .MuiBackdrop-root": {
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  "& .MuiDialog-paper": {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    padding: theme.spacing(3),
    gap: theme.spacing(2),
    margin: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      maxWidth: "700px", // Increased from 450px
      padding: theme.spacing(4),
    },
    // backgroundColor: "rgba(255, 255, 255, 0.8)",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    boxShadow:
      "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
    ...theme.applyStyles?.("dark", {
      backgroundColor: "rgba(8, 8, 18, 0.5)",
      boxShadow:
        "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
    }),
    "&::before": {
      content: '""',
      display: "block",
      position: "absolute",
      zIndex: -1,
      inset: 0,
      // backgroundImage:
      //   "radial-gradient(ellipse at 50% 50%, hsla(220, 100%, 97%, 0.5), hsla(0, 0%, 100%, 0.5))",
      // backgroundRepeat: "no-repeat",
      ...theme.applyStyles?.("dark", {
        backgroundImage:
          "radial-gradient(at 50% 50%, hsla(220, 100%, 16%, 0.3), hsla(220, 30%, 5%, 0.3))",
      }),
    },
  },
}));

const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  padding: 0,
  marginBottom: theme.spacing(2),
}));

export { StyledDialog, StyledDialogTitle };
