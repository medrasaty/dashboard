"use client";
import { Container, Alert } from "@mui/material";

export default function UserDetailErrorPage() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Alert severity="error">
        Error loading user profile. Please try again later.
      </Alert>
    </Container>
  );
}
