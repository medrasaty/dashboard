import { BaseUser } from "../auth/types";
import { AxiosInstance } from "axios";
import { DetailedUser } from "./types";
import { User } from "./types";

/**
 * Server API endpoints (ep)
 */
const ep = {
  schools: {
    users: (schoolId: BaseUser["school"]) => {
      return `/schools/${schoolId}/users/`;
    },
  },

  users: {
    detail: (userId: BaseUser["id"]) => {
      return `/users/${userId}/`;
    },
  },
};

export async function getUsersInSchool(
  client: AxiosInstance,
  schoolId: BaseUser["school"]
) {
  const res = await client.get(ep.schools.users(schoolId));
  return res.data;
}

/**
 * getUser for specific school, if user is not in school of current user
 * throw Not found error
 * @param client  AxiosInstance represents an authenticated client
 * @param userId
 * @returns
 */
export async function getUserInSchool(
  client: AxiosInstance,
  userId: BaseUser["id"],
  school: User["school"]
) {
  const { data: user } = await client.get<DetailedUser>(
    ep.users.detail(userId)
  );

  if (user.school !== school) {
    // This admin is trying to access information
    // for a student that doesn't belong to his school
    // prevent it and log erorr info to sentry
    throw new Error("Not found", { cause: 404 });
  }

  return user;
}
