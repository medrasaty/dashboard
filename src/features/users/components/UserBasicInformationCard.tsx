"use client";
import type React from "react";
import { useMemo, useState } from "react";
import {
  Box,
  Button,
  DialogContent,
  Grid2 as Grid,
  InputAdornment,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  School,
  Person,
  Email,
  CalendarToday,
  WcOutlined,
  Info,
  EmailOutlined,
} from "@mui/icons-material";
import { InfoItem } from "@/components";
import InfoCard from "../components/InfoCard";
import { DetailedUser } from "../types";
import { InfoItemProps } from "@/components/InfoItem";
import { StyledDialog, StyledDialogTitle } from "@/components/styled/Dialog";
import useVisibleState from "@/hooks/useVisibleState";
import { Controller, useForm } from "react-hook-form";
import { EmailSchema, EmailSchemaType, UpdateUserFormSchema } from "../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdateUserMutation } from "../mutations";

type UserBasicInformationCardProps = {
  profile: DetailedUser;
};

export default function UserBasicInformationCard({
  profile,
}: UserBasicInformationCardProps) {
  const formattedJoinDate = useMemo(() => {
    return new Date(profile.date_joined).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }, [profile.date_joined]);

  const infoItems = [
    {
      label: "Joined",
      icon: <CalendarToday color="primary" />,
      value: formattedJoinDate,
    },
    {
      label: "School",
      icon: <School color="primary" />,
      value: profile.school_name,
    },
    {
      label: "Username",
      icon: <Person color="primary" />,
      value: profile.username,
    },
    {
      label: "Gender",
      icon: <WcOutlined color="primary" />,
      value: profile.gender === "M" ? "Male" : "Female",
    },
  ] satisfies InfoItemProps[];

  return (
    <InfoCard title="User Information">
      <Grid container spacing={3}>
        {infoItems.map((info, index) => (
          <Grid size={{ xs: 12, sm: 6 }} key={index}>
            <InfoItem {...info} />
          </Grid>
        ))}
        <Grid size={{ xs: 12, sm: 6 }}>
          <EmailInfoItem profile={profile} />
        </Grid>
      </Grid>
    </InfoCard>
  );
}

function EmailInfoItem({ profile }: { profile: DetailedUser }) {
  const [visible, show, hide] = useVisibleState();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const theme = useTheme();
  const {
    control,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailSchemaType>({
    resolver: zodResolver(EmailSchema),
    defaultValues: {
      id: profile.id,
      email: profile.email,
    },
  });

  const { mutate: update } = useUpdateUserMutation();
  const onSubmit = (data: EmailSchemaType) => {
    setIsSubmitting(true);
    update(data, {
      onSuccess: hide,
      onError: (error) => {
        if (error?.response?.data?.email) {
          setError("email", {
            // @ts-ignore
            message: error?.response?.data?.email ?? null,
          });
        }
      },
      onSettled: () => setIsSubmitting(false),
    });
  };
  return (
    <>
      <InfoItem
        onEdit={show}
        label="Email"
        icon={<Email color="primary" />}
        value={profile.email}
      />
      <StyledDialog open={visible} onClose={hide}>
        <StyledDialogTitle>Edit Email</StyledDialogTitle>
        <DialogContent>
          <Stack mt={3}>
            <Controller
              name="email"
              control={control}
              disabled={isSubmitting}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Email"
                  type="email"
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailOutlined />
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
            <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
              <Button onClick={hide} sx={{ mr: 1 }}>
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                loading={isSubmitting}
                disabled={isSubmitting}
                onClick={handleSubmit(onSubmit)}
              >
                Submit
              </Button>
            </Box>
          </Stack>
        </DialogContent>
      </StyledDialog>
    </>
  );
}
