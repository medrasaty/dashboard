"use client";
import { Container, Box, Grid2 as Grid, Skeleton, Stack } from "@mui/material";

export default function UserDetailScreenSkeleton() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Skeleton
              variant="rectangular"
              width="100%"
              height={600}
              sx={{ borderRadius: 2 }}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 8 }}>
            <Stack spacing={3}>
              <Skeleton
                variant="rectangular"
                width="100%"
                height={300}
                sx={{ borderRadius: 2 }}
              />
              <Skeleton
                variant="rectangular"
                width="100%"
                height={200}
                sx={{ borderRadius: 2 }}
              />
              <Skeleton
                variant="rectangular"
                width="100%"
                height={150}
                sx={{ borderRadius: 2 }}
              />
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
