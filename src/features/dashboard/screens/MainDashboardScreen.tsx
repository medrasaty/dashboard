"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Copyright from "../internals/components/Copyright";
import { Typography } from "@mui/material";
import { Link } from "@mui/material";
import { useRouter } from "next/navigation";

export function MainDashboardScreen() {
  return (
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
      <CommingSoon />
      <Copyright sx={{ my: 4 }} />
    </Box>
  );
}

function CommingSoon() {
  const router = useRouter();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Typography variant="h3">Coming Soon</Typography>
      <Typography color="textDisabled" variant="caption">
        We are working hard to bring informative dashboard home page
      </Typography>
      <Link
        color="primary"
        underline="hover"
        onClick={() => router.push("/dashboard/users")}
        sx={{ cursor: "pointer" }}
      >
        go to user page
      </Link>
    </Box>
  );
}
