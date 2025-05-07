"use client";

import { useState } from "react";
import {
  Button,
  DialogContent,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Button as Btn } from "@/components/ui/button";
import { Close as CloseIcon } from "@mui/icons-material";
import {
  StyledDialog as Dialog,
  StyledDialogTitle,
} from "@/components/styled/Dialog";
import { CreateUserForm } from "./forms/CreateUserForm";
import { DetailedUser } from "../types";
import { UpdateUserForm } from "./forms/UpdateUserForm";

export function CreateUserDialog() {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Add New User
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        fullScreen={fullScreen}
        maxWidth="md"
        fullWidth
        TransitionProps={{
          enter: theme.transitions.duration.enteringScreen,
          exit: theme.transitions.duration.leavingScreen,
        }}
      >
        <StyledDialogTitle>
          Add New User
          <IconButton
            aria-label="close"
            onClick={handleClose}
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
          <CreateUserForm onSuccess={handleClose} />
        </DialogContent>
      </Dialog>
    </>
  );
}

export function UpdateUserDialog({ user }: { user: DetailedUser }) {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Btn variant="secondary" onClick={handleClickOpen}>
        Update user
      </Btn>
      <Dialog
        open={open}
        onClose={handleClose}
        fullScreen={fullScreen}
        maxWidth="md"
        fullWidth
        TransitionProps={{
          enter: theme.transitions.duration.enteringScreen,
          exit: theme.transitions.duration.leavingScreen,
        }}
      >
        <StyledDialogTitle>
          Update user
          <IconButton
            aria-label="close"
            onClick={handleClose}
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
          <UpdateUserForm user={user} onSuccess={handleClose} />
        </DialogContent>
      </Dialog>
    </>
  );
}
