import { BaseUser } from "@features/auth/types";
import { StudentMoreSchema, TeacherMoreSchema, UserTypeEnum } from "./schema";

export type UserTypes = "STUDENT" | "TEACHER" | "ADMIN" | "SYSTEM";

export type TeacherMoreType = z.infer<typeof TeacherMoreSchema>;

export type StudentMoreType = z.infer<typeof StudentMoreSchema>;

interface Student extends BaseUser {
  type: "STUDENT";
  more: StudentMoreType;
}

interface Teacher extends BaseUser {
  type: "TEACHER";
  more: TeacherMoreType;
}

interface Admin extends BaseUser {
  type: "ADMIN";
}

export type User = Student | Teacher;

export type DetailedUser = User & {
  school_name: string;
};
