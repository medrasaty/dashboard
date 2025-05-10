import InfoCard from "./InfoCard";
import { Grid2 } from "@mui/material";
import { useUserDetails } from "../providers";
import { StudentMoreType, TeacherMoreType } from "../types";
import InfoItem, { InfoItemProps } from "@/components/InfoItem";
import useOpen from "@/hooks/useOpen";
import { StyledDialog, StyledDialogTitle } from "@/components/styled/Dialog";
import UpdateStudentMoreForm from "./forms/UpdateStudentMoreForm";
import React, { JSX, useMemo } from "react";
import { UpdateTeacherMoreForm2 } from "./forms/UpdateTeacherMoreForm";
import { useSubjects } from "../queries";


/**
 * Dynamic card based on user type
 */
export default function UserMoreInfoCard() {
  const user = useUserDetails();

  // different card for different users.
  const MoreCard = useMemo(
    () => (user.type == "STUDENT" ? StudentMoreCard : TeacherMoreCard),
    [user.type]
  );

  return <MoreCard more={user.more} />;
}

function MoreCardBase({
  title,
  infoItems,
  dialogTitle,
  dialogContent,
  onEdit,
  open,
  hide,
}: {
  title: string;
  infoItems: InfoItemProps[];
  dialogTitle: string;
  dialogContent: JSX.Element;
  onEdit: () => void;
  open: boolean;
  hide: () => void;
}) {
  return (
    <>
      <InfoCard title={title} onEdit={onEdit}>
        <Grid2 container spacing={3}>
          {infoItems.map((info, index) => (
            <Grid2 size={{ xs: 12, sm: 6 }} key={index}>
              <InfoItem {...info} />
            </Grid2>
          ))}
        </Grid2>
      </InfoCard>
      <StyledDialog open={open} onClose={hide}>
        <StyledDialogTitle>{dialogTitle}</StyledDialogTitle>
        {dialogContent}
      </StyledDialog>
    </>
  );
}

function StudentMoreCard({ more: studentmore }: { more: StudentMoreType }) {
  const { open, show: ShowEditDialog, hide } = useOpen();

  const infoItems = [
    {
      label: "Grade",
      value: studentmore.grade?.toString(),
    },
  ] satisfies InfoItemProps[];

  return (
    <MoreCardBase
      title="More"
      infoItems={infoItems}
      dialogTitle="Edit Student More"
      dialogContent={
        <UpdateStudentMoreForm
          initialGrade={studentmore.grade}
          onClose={hide}
        />
      }
      onEdit={ShowEditDialog}
      open={open}
      hide={hide}
    />
  );
}

function TeacherMoreCard({ more: teachermore }: { more: TeacherMoreType }) {
  const { open, show, hide } = useOpen();

  const { data: subjects, isPending } = useSubjects();

  // get the subject names from the subjects ids array
  const subjectNames = subjects
    ?.filter((subject) => {
      return teachermore.subjects?.includes(subject.id);
    })
    .map((subject) => subject.name)
    .join(", ");

  const infoItems: InfoItemProps[] = useMemo(
    () => [
      {
        label: "Grades",
        value: teachermore.grades?.toString(),
      },
      {
        label: "Subjects",
        value: isPending ? "Loading..." : subjectNames,
      },
    ],
    [teachermore, isPending, subjectNames]
  );

  return (
    <MoreCardBase
      title="More"
      infoItems={infoItems}
      dialogTitle="Edit more"
      dialogContent={<UpdateTeacherMoreForm2 onClose={hide} />}
      onEdit={show}
      open={open}
      hide={hide}
    />
  );
}
