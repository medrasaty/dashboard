"use client";
import {
  Alert,
  Box,
  Button,
  FormControl,
  Grid2 as Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import {
  EmailOutlined,
  PersonOutline,
  FamilyRestroomOutlined,
  WcOutlined,
} from "@mui/icons-material";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { GenderEnum, UserTypeEnum } from "../../schema";
import { z, ZodSchema } from "zod";

export interface UserFormProps {
  onSubmit: (data: any, setError: () => void) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
  defaultValues: any;
  schema: ZodSchema;
  mode: "create" | "update";
}

/**
 * @returns Base user form with abilit to create or update user
 */
export default function UserForm({
  schema,
  defaultValues,
  onSubmit,
  isSubmitting = false,
  onCancel,
  mode = "create",
}: UserFormProps) {
  type formType = z.infer<typeof schema>;
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<formType>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit((data) => onSubmit(data, setError))}
      sx={{ mt: 3 }}
    >
      <Typography mb={2} variant="h6" component="h2" gutterBottom>
        {mode === "create" ? "Add New User" : "Update User"}
      </Typography>
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
        <Grid size={{ xs: 12, sm: 6 }}>
          <FormControl fullWidth>
            <InputLabel id="type-label">User Type</InputLabel>
            <Controller
              name="type"
              control={control}
              disabled={isSubmitting}
              render={({ field }) => (
                <Select
                  {...field}
                  labelId="type-label"
                  label="User Type"
                  error={!!errors.type}
                  startAdornment={
                    <InputAdornment position="start">
                      <WcOutlined />
                    </InputAdornment>
                  }
                >
                  <MenuItem value={UserTypeEnum.student}>Student</MenuItem>
                  <MenuItem value={UserTypeEnum.teacher}>Teacher</MenuItem>
                </Select>
              )}
            />
          </FormControl>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <FormControl fullWidth>
            <InputLabel id="gender-label">Gender</InputLabel>
            <Controller
              name="gender"
              control={control}
              disabled={isSubmitting}
              render={({ field }) => (
                <Select
                  {...field}
                  labelId="gender-label"
                  label="Gender"
                  error={!!errors.gender}
                  startAdornment={
                    <InputAdornment position="start">
                      <WcOutlined />
                    </InputAdornment>
                  }
                >
                  <MenuItem value={GenderEnum.male}>Male</MenuItem>
                  <MenuItem value={GenderEnum.female}>Female</MenuItem>
                </Select>
              )}
            />
          </FormControl>
        </Grid>
        <Grid size={{ xs: 12, sm: 12 }}>
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
        </Grid>
      </Grid>
      <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
        <Button onClick={onCancel} sx={{ mr: 1 }}>
          Cancel
        </Button>
        <Button
          loading={isSubmitting}
          disabled={isSubmitting}
          type="submit"
          variant="contained"
          color="primary"
        >
          {mode === "create" ? "Create" : "Update"}
        </Button>
      </Box>
    </Box>
  );
}
