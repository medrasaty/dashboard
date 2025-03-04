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
import {
  AddNewUserFormSchema,
  AddNewUserFormType,
  GenderEnum,
  UserTypeEnum,
} from "../schema";
import { useCurrentUser } from "@/features/auth/hooks";
import useAddNewUserMutation from "../mutations";
import useSubmitLoading from "@/hooks/useSubmitLoading";
import { AxiosError } from "axios";

type FormData = AddNewUserFormType;

interface AddNewUserFormProps {
  onClose: () => void;
}

export default function AddNewUserForm({ onClose }: AddNewUserFormProps) {
  const {
    isSubmitting,
    show: showLoading,
    hide: hideLoading,
  } = useSubmitLoading();
  const user = useCurrentUser();
  const { mutate: addUser } = useAddNewUserMutation();
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(AddNewUserFormSchema),
    defaultValues: {
      name: "",
      father_name: "",
      grand_father_name: "",
      family_name: "",
      gender: GenderEnum.male,
      type: UserTypeEnum.student,
      email: "",
      school: user.school,
    },
  });

  const onSubmit = (data: FormData) => {
    // create user, add proper endpoint
    showLoading();
    addUser(data, {
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
        }
      },
      onSettled: () => {
        hideLoading();
      },
    });
  };

  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      sx={{ mt: 3 }}
    >
      <Typography mb={2} variant="h6" component="h2" gutterBottom>
        Add New User
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

// "use client";
// import {
//   Box,
//   Button,
//   Container,
//   FormControl,
//   Grid,
//   InputAdornment,
//   InputLabel,
//   MenuItem,
//   Paper,
//   Select,
//   TextField,
//   Typography,
// } from "@mui/material";
// import {
//   EmailOutlined,
//   PersonOutline,
//   FamilyRestroomOutlined,
//   WcOutlined,
// } from "@mui/icons-material";
// import { useForm, Controller } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";

// const GenderEnum = {
//   male: "male",
//   female: "female",
// } as const;

// const AddNewUserFormSchema = z.object({
//   name: z.string().min(2, "Name must be at least 2 characters"),
//   father_name: z.string().min(2, "Father's name must be at least 2 characters"),
//   grand_father_name: z
//     .string()
//     .min(2, "Grandfather's name must be at least 2 characters"),
//   family_name: z.string().min(2, "Family name must be at least 2 characters"),
//   gender: z.enum([GenderEnum.male, GenderEnum.female]),
//   email: z.string().email("Invalid email address"),
// });

// type FormData = z.infer<typeof AddNewUserFormSchema>;

// export default function AddNewUserForm() {
//   const {
//     control,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<FormData>({
//     resolver: zodResolver(AddNewUserFormSchema),
//     defaultValues: {
//       name: "",
//       father_name: "",
//       grand_father_name: "",
//       family_name: "",
//       gender: GenderEnum.male,
//       email: "",
//     },
//   });

//   const onSubmit = (data: FormData) => {
//     console.log(data);
//   };

//   return (
//     <Container maxWidth="md">
//       <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
//         <Typography variant="h4" component="h1" gutterBottom align="center">
//           Add New User
//         </Typography>
//         <Box
//           component="form"
//           noValidate
//           onSubmit={handleSubmit(onSubmit)}
//           sx={{ mt: 3 }}
//         >
//           <Grid container spacing={3}>
//             <Grid item xs={12} sm={6}>
//               <Controller
//                 name="name"
//                 control={control}
//                 render={({ field }) => (
//                   <TextField
//                     {...field}
//                     fullWidth
//                     label="Name"
//                     error={!!errors.name}
//                     helperText={errors.name?.message}
//                     InputProps={{
//                       startAdornment: (
//                         <InputAdornment position="start">
//                           <PersonOutline />
//                         </InputAdornment>
//                       ),
//                     }}
//                   />
//                 )}
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <Controller
//                 name="father_name"
//                 control={control}
//                 render={({ field }) => (
//                   <TextField
//                     {...field}
//                     fullWidth
//                     label="Father's Name"
//                     error={!!errors.father_name}
//                     helperText={errors.father_name?.message}
//                     InputProps={{
//                       startAdornment: (
//                         <InputAdornment position="start">
//                           <PersonOutline />
//                         </InputAdornment>
//                       ),
//                     }}
//                   />
//                 )}
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <Controller
//                 name="grand_father_name"
//                 control={control}
//                 render={({ field }) => (
//                   <TextField
//                     {...field}
//                     fullWidth
//                     label="Grandfather's Name"
//                     error={!!errors.grand_father_name}
//                     helperText={errors.grand_father_name?.message}
//                     InputProps={{
//                       startAdornment: (
//                         <InputAdornment position="start">
//                           <PersonOutline />
//                         </InputAdornment>
//                       ),
//                     }}
//                   />
//                 )}
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <Controller
//                 name="family_name"
//                 control={control}
//                 render={({ field }) => (
//                   <TextField
//                     {...field}
//                     fullWidth
//                     label="Family Name"
//                     error={!!errors.family_name}
//                     helperText={errors.family_name?.message}
//                     InputProps={{
//                       startAdornment: (
//                         <InputAdornment position="start">
//                           <FamilyRestroomOutlined />
//                         </InputAdornment>
//                       ),
//                     }}
//                   />
//                 )}
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <Controller
//                 name="email"
//                 control={control}
//                 render={({ field }) => (
//                   <TextField
//                     {...field}
//                     fullWidth
//                     label="Email"
//                     type="email"
//                     error={!!errors.email}
//                     helperText={errors.email?.message}
//                     InputProps={{
//                       startAdornment: (
//                         <InputAdornment position="start">
//                           <EmailOutlined />
//                         </InputAdornment>
//                       ),
//                     }}
//                   />
//                 )}
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <FormControl fullWidth>
//                 <InputLabel id="gender-label">Gender</InputLabel>
//                 <Controller
//                   name="gender"
//                   control={control}
//                   render={({ field }) => (
//                     <Select
//                       {...field}
//                       labelId="gender-label"
//                       label="Gender"
//                       error={!!errors.gender}
//                       startAdornment={
//                         <InputAdornment position="start">
//                           <WcOutlined />
//                         </InputAdornment>
//                       }
//                     >
//                       <MenuItem value={GenderEnum.male}>Male</MenuItem>
//                       <MenuItem value={GenderEnum.female}>Female</MenuItem>
//                     </Select>
//                   )}
//                 />
//               </FormControl>
//             </Grid>
//           </Grid>
//           <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
//             <Button
//               type="submit"
//               variant="contained"
//               color="primary"
//               size="large"
//               sx={{ minWidth: 200 }}
//             >
//               Submit
//             </Button>
//           </Box>
//         </Box>
//       </Paper>
//     </Container>
//   );
// }

// // "use client";
// // import {
// //   FormControl,
// //   InputAdornment,
// //   InputLabel,
// //   MenuItem,
// //   Select,
// //   Stack,
// //   TextField as MuiTextField,
// //   TextFieldProps,
// //   Button,
// // } from "@mui/material";
// // import { EmailOutlined } from "@mui/icons-material";
// // import { SubmitHandler, useForm } from "react-hook-form";
// // import { z } from "zod";
// // import { AddNewUserFormSchema, GenderEnum } from "../schema";
// // import { zodResolver } from "@hookform/resolvers/zod";

// // /**
// //  *
// //  * Base TextField with default options for add user form
// //  * @param props {TextFieldProps}
// //  * @returns
// //  */
// // const TextField = (props: TextFieldProps) => (
// //   <MuiTextField variant="outlined" required fullWidth {...props} />
// // );

// // export default function AddNewUserForm() {
// //   const {
// //     register,
// //     handleSubmit,
// //     formState: { errors },
// //   } = useForm<z.infer<typeof AddNewUserFormSchema>>({
// //     resolver: zodResolver(AddNewUserFormSchema),
// //   });

// //   const onSubmit: SubmitHandler<z.infer<typeof AddNewUserFormSchema>> = async (
// //     data
// //   ) => {
// //     console.log(data);
// //   };

// //   const gap = 4;

// //   return (
// //     <Stack gap={gap}>
// //       <Stack direction={"row"} gap={gap}>
// //         <TextField
// //           error={!!errors?.name}
// //           helperText={errors.name?.message}
// //           {...register("name", { required: true })}
// //           label="الاسم"
// //         />
// //         <TextField
// //           {...register("father_name", { required: true })}
// //           label="اسم الأب"
// //           error={!!errors?.father_name}
// //           helperText={errors.father_name?.message}
// //         />
// //       </Stack>
// //       <Stack direction={"row"} gap={gap}>
// //         <TextField
// //           {...register("grand_father_name", { required: true })}
// //           label="اسم الجد"
// //           error={!!errors?.grand_father_name}
// //           helperText={errors.grand_father_name?.message}
// //         />
// //         <TextField
// //           {...register("family_name", { required: true })}
// //           label="اسم العائلة"
// //           error={!!errors.family_name}
// //           helperText={errors.family_name?.message}
// //         />
// //       </Stack>
// //       <Stack direction={"row"} gap={gap}>
// //         <TextField
// //           {...register("email", { required: true })}
// //           type="email"
// //           error={!!errors?.email}
// //           helperText={errors.email?.message}
// //           label="البريد الإلكتروني"
// //           InputProps={{
// //             startAdornment: (
// //               <InputAdornment position="start">
// //                 <EmailOutlined />
// //               </InputAdornment>
// //             ),
// //           }}
// //         />
// //         <FormControl fullWidth>
// //           <InputLabel id="gender">الجنس</InputLabel>
// //           <Select
// //             {...register("gender", { required: true })}
// //             required
// //             variant="outlined"
// //             label="الجنس"
// //           >
// //             <MenuItem value={GenderEnum.male}>ذكر</MenuItem>
// //             <MenuItem value={GenderEnum.female}>انثى</MenuItem>
// //           </Select>
// //         </FormControl>
// //       </Stack>
// //       <Button variant="outlined" onClick={handleSubmit(onSubmit)}>
// //         submit
// //       </Button>
// //     </Stack>
// //   );
// // }
