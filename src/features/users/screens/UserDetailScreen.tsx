"use client";
import type React from "react";
import {
  Box,
  Typography,
  Stack,
  Grid2 as Grid,
  Container,
  Alert,
} from "@mui/material";
import UserDetailScreenSkeleton from "./UserDetailSkeleton";
import { useUserDetails } from "../queries";
import { User } from "./type";
import InfoCard from "../components/InfoCard";
import { DetailedUser } from "../types";
import UserActionCard from "../components/UserActionCard";
import UserBasicInformationCard from "../components/UserBasicInformationCard";

export default function UserDetailScreen({ userId }: { userId: User["id"] }) {
  const { data: profile, isLoading, error } = useUserDetails(userId);

  if (isLoading) {
    return <UserDetailScreenSkeleton />;
  }

  if (error || !profile) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error">
          Error loading user profile. Please try again later.
        </Alert>
      </Container>
    );
  }

  const renderAdminVersion = () => (
    <Box sx={{ py: 4 }}>
      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 4 }}>
          <UserActionCard profile={profile} />
        </Grid>
        <Grid size={{ xs: 12, md: 8 }}>
          <Stack spacing={3}>
            <UserBasicInformationCard profile={profile} />
            <UserActivityStatisticsCard profile={profile} />
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );

  return renderAdminVersion();
}

type UserActivityStatisticsCardProps = {
  profile: DetailedUser;
};

function UserActivityStatisticsCard({
  profile,
}: UserActivityStatisticsCardProps) {
  return (
    <InfoCard title="Activity Statistics">
      <Grid container spacing={3}>
        {["Total Views", "Reputation", "Followers", "Following"].map(
          (stat, index) => (
            <Grid size={{ xs: 6, sm: 3 }} key={index}>
              <Box textAlign="center" p={2}>
                <Typography variant="h4" color="primary">
                  {profile[stat.toLowerCase().replace(" ", "_")]}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {stat}
                </Typography>
              </Box>
            </Grid>
          )
        )}
      </Grid>
    </InfoCard>
  );
}
