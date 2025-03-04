import { BaseUser } from "../auth/types";

export const UsersKeys = {
  all: ["users"] as const,
  withSchool: (schoolId: BaseUser["school"]) => [...UsersKeys.all, schoolId],
  Details: (userId: BaseUser["id"]) => [...UsersKeys.all, userId],
};
