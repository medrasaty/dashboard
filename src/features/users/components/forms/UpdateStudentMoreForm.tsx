import { Controller, useForm } from "react-hook-form";
import { StudentMoreType } from "../../types";
import { zodResolver } from "@hookform/resolvers/zod";
import { StudentMoreSchema } from "../../schema";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import {
  useUpdateStudentMoreMutation,
  useUpdateUserMutation,
} from "../../mutations";
import { useUserDetails } from "../../providers";

const GRADES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

export default function UpdateStudentMoreForm({
  initialGrade,
  onClose,
}: {
  initialGrade: number;
  onClose: () => void;
}) {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<StudentMoreType>({
    resolver: zodResolver(StudentMoreSchema),
    defaultValues: {
      grade: initialGrade,
    },
  });

  const user = useUserDetails();

  const { mutate: update, isPending } = useUpdateStudentMoreMutation(user.id);

  const onSubmit = (data: StudentMoreType) => {
    // update than close
    update(data, { onSuccess: onClose });
  };

  return (
    <FormControl fullWidth component={"form"} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <FormControl fullWidth>
          <InputLabel id="grade-label">User Grade</InputLabel>
          <Controller
            name="grade"
            control={control}
            disabled={isPending}
            render={({ field }) => (
              <Select
                {...field}
                labelId="grade-label"
                // value={field.value}
                label="User Grade"
                error={!!errors.type}
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
        </FormControl>

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
