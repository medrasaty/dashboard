"use client";
import { Box, Stack, Typography } from "@mui/material";
import AddNewUserForm from "../components/AddNewUserForm";

export default function AddNewUserScreen() {
  return (
    <Stack gap={4}>
      <Box mt={6}>
        <Stack direction={"row"} justifyContent={"space-between"}>
          <Typography variant="h2">New User</Typography>
        </Stack>
      </Box>
      <AddNewUserForm />
    </Stack>
  );
}
