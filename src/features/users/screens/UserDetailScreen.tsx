"use client";
import type React from "react";
import { Box, Stack, Grid2 as Grid, Typography } from "@mui/material";
import UserActionCard from "../components/UserActionCard";
import UserBasicInformationCard from "../components/UserBasicInformationCard";
import {
  UserDetailApi,
  UserDetailProvider,
  useUserDetails,
} from "../providers";
import { DetailedUser } from "../types";
import { UserTypeEnum } from "../schema";
import InfoCard from "../components/InfoCard";
import UserMoreInfoCard from "../components/UserMoreInfoCard";

export default function UserDetailScreen({
  userId,
}: {
  userId: DetailedUser["id"];
}) {
  return (
    <UserDetailProvider id={userId}>
      <Box sx={{ py: 4 }}>
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 4 }}>
            <UserActionCard />
          </Grid>
          <Grid size={{ xs: 12, md: 8 }}>
            <Stack spacing={3}>
              <UserBasicInformationCard />
              <UserMoreInfoCard />
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </UserDetailProvider>
  );
}
