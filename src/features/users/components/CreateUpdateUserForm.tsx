"use client";
import {
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
import {
  useForm,
  Controller,
  ControllerProps,
  FieldValues,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AddNewUserFormSchema,
  GenderEnum,
  UpdateUserFormSchema,
  UserTypeEnum,
} from "../schema";
import useAddNewUserMutation, { useUpdateUserMutation } from "../mutations";
import useSubmitLoading from "@/hooks/useSubmitLoading";
import { z } from "zod";
import { useMemo } from "react";

interface CreateUpdateUserFormProps<T> {
  onClose: () => void;
  mode: "create" | "update";
  defaultValues: any;
}

/**
 * Unified interface for creating and updating users,
 */
export default function CreateUpdateUserForm<T>({
  onClose,
  mode,
  defaultValues,
}: CreateUpdateUserFormProps<T>) {
  const {
    isSubmitting,
    show: showLoading,
    hide: hideLoading,
  } = useSubmitLoading();

  const { mutate: create } = useAddNewUserMutation();
  const { mutate: update } = useUpdateUserMutation();

  const schema = useMemo(() => {
    return mode === "create" ? AddNewUserFormSchema : UpdateUserFormSchema;
  }, [mode]);

  type FormData = z.infer<typeof schema>;

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues,
  });

  const mutationOptions = useMemo(
    () => ({
      onSuccess: () => {
        onClose();
      },
      onError: (error) => {
        if (error?.response?.data?.email) {
          setError("email", {
            // @ts-ignore
            message: error?.response?.data?.email ?? null,
          });
        } else {
          alert("something wrong happend");
          console.log(error);
        }
      },
      onSettled: () => {
        hideLoading();
      },
    }),
    [onClose, setError, hideLoading]
  );

  const onCreate = (data: FormData) => {
    create(data, mutationOptions);
  };

  const onUpdate = (data: FormData) => {
    update(data, mutationOptions);
  };

  const onSubmit = (data: FormData) => {
    // create user, add proper endpoint
    showLoading();
    mode === "create" ? onCreate(data) : onUpdate(data);
  };

  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      sx={{ mt: 3 }}
    >
      <Typography mb={2} variant="h6" component="h2" gutterBottom>
        {mode === "create" ? "Add New User" : "Update User"}
      </Typography>
      <CommonUserFormFields
        errors={errors}
        control={control}
        isSubmitting={isSubmitting}
      />
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

function CommonUserFormFields<T extends FieldValues>({
  isSubmitting,
  control,
  errors,
}: {
  isSubmitting: boolean;
  control: ControllerProps<T>["control"];
  // FIXME: add propper type.
  errors: any;
}) {
  return (
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
  );
}
