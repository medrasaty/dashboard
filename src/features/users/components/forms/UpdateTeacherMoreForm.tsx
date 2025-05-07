import { Controller, useForm } from "react-hook-form";
import { TeacherMoreType } from "../../types";
import { zodResolver } from "@hookform/resolvers/zod";
import { TeacherMoreSchema } from "../../schema";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { useUserDetails } from "../../providers";

const GRADES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

export default function UpdateTeacherMoreForm({
  onClose,
}: {
  onClose: () => void;
}) {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TeacherMoreType>({
    resolver: zodResolver(TeacherMoreSchema),
    defaultValues: {
      // You must explicitly pass an empty array for multiple select.
      grades: [],
      subjecs: [],
    },
  });

  console.log(errors);

  const user = useUserDetails();

  const isPending = false;

  const onSubmit = (data: TeacherMoreType) => {
    // update than close
    console.log(data);
    onClose();
  };

  return (
    <FormControl fullWidth component={"form"} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <Stack direction={"row"} gap={2}>
          <FormControl fullWidth>
            <InputLabel id="grades-label">Teacher Grades</InputLabel>
            <Controller
              name="grades"
              control={control}
              disabled={isPending}
              render={({ field }) => {
                return (
                  <Select
                    {...field}
                    multiple
                    value={field.value}
                    labelId="grades-label"
                    label="Teacher Grades"
                    error={!!errors.grades}
                  >
                    {GRADES.map((grade) => {
                      return (
                        <MenuItem key={grade} value={grade}>
                          {grade}
                        </MenuItem>
                      );
                    })}
                  </Select>
                );
              }}
            />
            {!!errors?.grades && (
              <Typography>{errors.grades.message}</Typography>
            )}
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="subjects-label">Subjects</InputLabel>
            <Controller
              name="subjecs"
              control={control}
              disabled={isPending}
              render={({ field }) => (
                <Select
                  {...field}
                  value={field.value}
                  multiple
                  labelId="subjecs-label"
                  label="Subjects"
                  error={!!errors.subjects}
                >
                  {GRADES.map((grade) => {
                    return (
                      <MenuItem key={grade} value={grade}>
                        {grade}
                      </MenuItem>
                    );
                  })}
                </Select>
              )}
            />
            {!!errors?.subjecs && (
              <Typography>{errors.subjects.message}</Typography>
            )}
          </FormControl>
        </Stack>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            loading={isPending}
            variant="contained"
            color="primary"
            type="submit"
          >
            Submit
          </Button>
        </Box>
      </Stack>
    </FormControl>
  );
}
