import { BaseUser } from "../auth/types";
import { AxiosInstance } from "axios";
import { DetailedUser, Student, StudentMoreType } from "./types";
import { User } from "./types";
import { AddNewUserFormType, UpdateUserFormType, UserTypeEnum } from "./schema";
import { Client } from "@/lib/network";
import { PagePaginatedResponse } from "@/lib/types";

/**
 * Server API endpoints (ep)
 */
const ep = {
  schools: {
    users: () => {
      return `/users/`;
    },
  },

  users: {
    all: `/users/`,
    detail: (userId: BaseUser["id"]) => {
      return `/users/${userId}/`;
    },
  },
};

export async function getUsersInSchool(
  schoolId: BaseUser["school"],
  params?: any
) {
  const client = await Client();

  const res = await client.request<PagePaginatedResponse<User>>({
    method: "GET",
    url: ep.users.all,
    params: {
      school: schoolId,
      ...params,
    },
  });
  return res.data.results;
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

export async function createUser(
  client: AxiosInstance,
  data: AddNewUserFormType
): Promise<User> {
  const res = await client.request({
    method: "post",
    url: data.type === UserTypeEnum.teacher ? "/teachers/" : "/students/",
    data,
  });

  return res.data;
}

export async function updateUser(
  client: AxiosInstance,
  data: Partial<UpdateUserFormType>
): Promise<BaseUser> {
  const res = await client.request({
    // partial update
    method: "patch",
    url: `/users/${data.id}/`,
    data,
  });

  return res.data;
}

/**
 * @param studentId student id to be updated
 * @param data studentmore data
 * @returns Student instance
 */
export async function updateStudentMore(
  studentId: BaseUser["id"],
  data: Partial<StudentMoreType>
) {
  const client = await Client();

  const res = await client.request<Student>({
    method: "patch",
    url: `/students/${studentId}/`,
    data: {
      studentmore: data,
    },
  });

  return res.data;
}
