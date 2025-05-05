"use client";
import { Box, Stack, Typography } from "@mui/material";
import UsersList from "../components/StudentsList";
import AddUserDialog from "../components/AddNewUserDialog";

export function MainUsersScreen() {
  return (
    <Stack>
      <Box mt={6}>
        <Stack direction={"row"} justifyContent={"space-between"}>
          <Typography variant="h2">Users</Typography>
          <AddUserDialog />
        </Stack>
      </Box>
      <Box mt={5}>
        <UsersList />
      </Box>
    </Stack>
  );
}
