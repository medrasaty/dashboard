"use client";
import type React from "react";
import {
  Box,
  Typography,
  Stack,
  Avatar,
  Chip,
  Button,
  Divider,
  Card,
  CardContent,
  useTheme,
  IconButton,
  DialogContent,
  Tooltip,
  Grid2 as Grid,
} from "@mui/material";
import {
  Delete as DeleteIcon,
  Block as BlockIcon,
  Edit as EditIcon,
  Lock as LockIcon,
  Close as CloseIcon,
} from "@mui/icons-material";

import { DetailedUser } from "../types";
import useVisibleState from "@/hooks/useVisibleState";
import { StyledDialog, StyledDialogTitle } from "@/components/styled/Dialog";
import EditFullNameForm from "./forms/EditFullName";

export type UserActionCardProps = {
  profile: DetailedUser;
};

export default function UserActionCard({ profile }: UserActionCardProps) {
  return (
    <Card elevation={2} sx={{ borderRadius: 2, height: "100%" }}>
      <CardContent>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          textAlign="center"
        >
          <Avatar
            src={profile.profile_picture}
            alt={profile.full_name}
            sx={{
              width: 120,
              height: 120,
              mb: 2,
              border: "4px solid #f5f5f5",
            }}
          />
          <FullName profile={profile} />
          <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
            <Chip label={profile.type} color="primary" size="small" />
            {/* Verified chip here */}
          </Box>
          <Divider sx={{ width: "100%", my: 2 }} />
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Account Status
          </Typography>
          <Box sx={{ mb: 2, width: "100%" }}>
            <Chip
              label={profile.status === "active" ? "Active" : "Inactive"}
              color={profile.status === "active" ? "success" : "error"}
              size="small"
            />
          </Box>
          <Divider sx={{ width: "100%", my: 2 }} />
          <Stack spacing={2} width="100%">
            <Button
              variant="outlined"
              color="error"
              startIcon={<BlockIcon />}
              fullWidth
            >
              Suspend Account
            </Button>
            <Button
              variant="outlined"
              color="warning"
              startIcon={<LockIcon />}
              fullWidth
            >
              Reset Password
            </Button>
            <Button
              variant="contained"
              color="error"
              startIcon={<DeleteIcon />}
              fullWidth
            >
              Delete Account
            </Button>
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
}

/**
 * Display full name with the ability to update it
 */
function FullName({ profile }: { profile: DetailedUser }) {
  const theme = useTheme();
  const [visible, show, hide] = useVisibleState();
  return (
    <>
      <Stack direction={"row"} spacing={1}>
        <Typography variant="h6" gutterBottom>
          {profile.full_name}
        </Typography>
        <Box>
          <Tooltip title="edit full name">
            <IconButton onClick={show}>
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      </Stack>
      <StyledDialog
        open={visible}
        onClose={hide}
        maxWidth="md"
        fullWidth
        TransitionProps={{
          enter: theme.transitions.duration.enteringScreen,
          exit: theme.transitions.duration.leavingScreen,
        }}
      >
        <StyledDialogTitle>
          Edit Full name
          <IconButton
            aria-label="close"
            onClick={hide}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </StyledDialogTitle>
        <DialogContent sx={{ padding: 0 }}>
          <EditFullNameForm profile={profile} onClose={hide} />
        </DialogContent>
      </StyledDialog>
    </>
  );
}
