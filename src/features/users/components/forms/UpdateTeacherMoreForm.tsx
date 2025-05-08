import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
  CircularProgress,
} from "@mui/material";
import { TeacherMoreSchema } from "../../schema";
import { useUpdateTeacherMoreMutation } from "../../mutations";
import { useUserDetails } from "../../providers";
import { useSubjects } from "@features/users/queries";

// Constants
const GRADES = Array.from({ length: 12 }, (_, i) => i + 1);

// Type derived from Zod schema
type FormData = z.infer<typeof TeacherMoreSchema>;

export function UpdateTeacherMoreForm2({
  onClose,
}: {
  // Add any props if needed
  onClose: () => void;
}) {
  const user = useUserDetails();

  // fetch subjects list
  const { data: subjects = [], isLoading: isSubjectsLoading } = useSubjects();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(TeacherMoreSchema),
    defaultValues: {
      grades: user.more.grades,
      subjects: user.more.subjects,
    },
  });

  const { mutate: update, isPending } = useUpdateTeacherMoreMutation(user.id);

  const onSubmit = (data: FormData) => {
    update(data, {
      onSuccess: () => {
        // close modal
        onClose();
      },
    });
  };

  return (
    <Box component="form" mt={1} onSubmit={handleSubmit(onSubmit)} noValidate>
      <Stack spacing={3}>
        <Stack direction="row" gap={2}>
          {/* Grades Select */}
          <FormControl fullWidth error={!!errors.grades}>
            <InputLabel id="grades-label">Teacher Grades</InputLabel>
            <Controller
              name="grades"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  multiple
                  labelId="grades-label"
                  disabled={isPending}
                  label="Teacher Grades"
                >
                  {GRADES.map((grade) => (
                    <MenuItem key={grade} value={grade}>
                      {grade}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
            {errors.grades && (
              <Typography color="error">{errors.grades.message}</Typography>
            )}
          </FormControl>

          {/* Subjects Select */}
          <FormControl fullWidth error={!!errors.subjects}>
            <InputLabel id="subjects-label">Subjects</InputLabel>
            <Controller
              name="subjects"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  multiple
                  labelId="subjects-label"
                  disabled={isPending}
                  renderValue={(selected) =>
                    isSubjectsLoading ? (
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <CircularProgress size={20} />
                        <Typography variant="body2" ml={1}>
                          Loading subjects...
                        </Typography>
                      </Box>
                    ) : (
                      (selected as string[]).join(', ')
                    )
                  }
                  label="Subjects"
                >
                  {isSubjectsLoading ? (
                    <MenuItem disabled>Loading...</MenuItem>
                  ) : (
                    subjects.map((subject) => (
                      <MenuItem key={subject.id} value={subject.id}>
                        {subject.name}
                      </MenuItem>
                    ))
                  )}
                </Select>
              )}
            />
            {errors.subjects && (
              <Typography color="error">{errors.subjects.message}</Typography>
            )}
          </FormControl>
        </Stack>

        <Box display="flex" justifyContent="center">
          <Button
            loading={isPending}
            disabled={isPending}
            variant="contained"
            type="submit"
          >
            Submit
          </Button>
        </Box>
      </Stack>
    </Box>
  );
}
