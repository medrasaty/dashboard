"use client";
import { Container, Alert } from "@mui/material";
export default function UserNotFoundPage() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Alert severity="error">User not found</Alert>
    </Container>
  );
}
