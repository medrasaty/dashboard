"use client";
import InfoCard from "./InfoCard";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Grid2,
  TextField,
} from "@mui/material";
import { useUserDetails } from "../providers";
import { StudentMoreType, TeacherMoreType } from "../types";
import InfoItem, { InfoItemProps } from "@/components/InfoItem";
import useOpen from "@/hooks/useOpen";
import { StyledDialog, StyledDialogTitle } from "@/components/styled/Dialog";
import UpdateStudentMoreForm from "./forms/UpdateStudentMoreForm";

/**
 * Dynamic card based on user type
 */
export default function UserMoreInfoCard() {
  const user = useUserDetails();

  return user.type === "STUDENT" ? (
    <StudentMoreCard studentmore={user.more} />
  ) : (
    <TeacherMoreCard teachermore={user.more} />
  );
}

function StudentMoreCard({ studentmore }: { studentmore: StudentMoreType }) {
  const { open, show: ShowEditDialog, hide } = useOpen();

  const infoItems = [
    {
      label: "Grade",
      value: studentmore.grade?.toString(),
    },
  ] satisfies InfoItemProps[];

  return (
    <>
      <InfoCard title="More" onEdit={ShowEditDialog}>
        <Grid2 container spacing={3}>
          {infoItems.map((info, index) => (
            <Grid2 size={{ xs: 12, sm: 6 }} key={index}>
              <InfoItem {...info} />
            </Grid2>
          ))}
        </Grid2>
      </InfoCard>
      <StyledDialog open={open} onClose={hide}>
        <StyledDialogTitle>Edit Student More</StyledDialogTitle>
        <UpdateStudentMoreForm
          initialGrade={studentmore.grade}
          onClose={hide}
        />
      </StyledDialog>
    </>
  );
}

function TeacherMoreCard({ teachermore }: { teachermore: TeacherMoreType }) {
  const { open, show, hide } = useOpen();
  const infoItems = [
    {
      label: "Grades",
      value: teachermore.grades?.toString(),
    },
    {
      label: "Subjects",
      value: teachermore.subjects?.toString(),
    },
  ] satisfies InfoItemProps[];

  return (
    <>
      <InfoCard title="More" onEdit={show}>
        <Grid2 container spacing={3}>
          {infoItems.map((info, index) => (
            <Grid2 size={{ xs: 12, sm: 6 }} key={index}>
              <InfoItem {...info} />
            </Grid2>
          ))}
        </Grid2>
      </InfoCard>
      <Dialog open={open} onClose={hide}>
        <DialogTitle>Edit TeacherMore</DialogTitle>
        <DialogContent>
          <TextField />
          <TextField />
          <TextField />
        </DialogContent>
      </Dialog>
    </>
  );
}
