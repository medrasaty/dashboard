"use client";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FullNameSchemaType, FullNameSchema } from "../../schema";
import type React from "react";
import {
  Box,
  InputAdornment,
  TextField,
  Button,
  Grid2 as Grid,
} from "@mui/material";
import { PersonOutline, FamilyRestroomOutlined } from "@mui/icons-material";

import { DetailedUser } from "../../types";
import { useState } from "react";
import { useUpdateUserMutation } from "../../mutations";

export default function EditFullNameForm({
  profile,
  onClose,
}: {
  profile: DetailedUser;
  onClose: () => void;
}) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FullNameSchemaType>({
    resolver: zodResolver(FullNameSchema),
    defaultValues: {
      id: profile.id,
      name: profile.name,
      father_name: profile.father_name,
      grand_father_name: profile.grand_father_name,
      family_name: profile.family_name,
    },
  });

  const { mutate: update } = useUpdateUserMutation();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = (data: FullNameSchemaType) => {
    setIsSubmitting(true);
    update(data, {
      onSuccess: onClose,
      onSettled: () => setIsSubmitting(false),
    });
  };

  return (
    <Box
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      component="form"
      sx={{ mt: 3 }}
    >
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Controller
            name="name"
            control={control}
            disabled={isSubmitting}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Name"
                error={!!errors.name}
                helperText={errors.name?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonOutline />
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Controller
            name="father_name"
            control={control}
            disabled={isSubmitting}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Father's Name"
                error={!!errors.father_name}
                helperText={errors.father_name?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonOutline />
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Controller
            name="grand_father_name"
            control={control}
            disabled={isSubmitting}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Grandfather's Name"
                error={!!errors.grand_father_name}
                helperText={errors.grand_father_name?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonOutline />
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Controller
            name="family_name"
            control={control}
            disabled={isSubmitting}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Family Name"
                error={!!errors.family_name}
                helperText={errors.family_name?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FamilyRestroomOutlined />
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
        </Grid>
      </Grid>
      <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
        <Button onClick={onClose} sx={{ mr: 1 }}>
          Cancel
        </Button>
        <Button
          loading={isSubmitting}
          disabled={isSubmitting}
          type="submit"
          variant="contained"
          color="primary"
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
}
