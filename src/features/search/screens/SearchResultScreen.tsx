"use client";
import { useSearchQuery } from "../hooks";
import {
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import { User } from "@features/users/types";
import { useUserSearch } from "../queries";
import { useRouter } from "next/navigation";

export default function SearchResultScreen() {
  const { searchQuery } = useSearchQuery();
  const query = useUserSearch({ query: searchQuery });
  const router = useRouter();

  return (
    <Stack gap={9}>
      <Box mt={6}>
        <Typography variant="h2">Search Result</Typography>
      </Box>
      <Box>
        {query.isPending && <CircularProgress color="error" />}
        {query.isError && <Typography>Error</Typography>}
        {query.data?.results.map((user: User) => {
          return (
            <Button
              fullWidth
              sx={{ mt: 2, mb: 2 }}
              key={user.id}
              onClick={() => router.push(`/dashboard/users/${user.id}`)}
              variant="outlined"
            >
              {user.full_name}
            </Button>
          );
        })}
      </Box>
    </Stack>
  );
}
