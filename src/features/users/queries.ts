import { useQuery } from "@tanstack/react-query";
import { getUserInSchool, getUsersInSchool } from "./requests";
import { BaseUser } from "../auth/types";
import { UsersKeys } from "./keys";
import { getSubjects } from "./requests";
import { useAuthClient, useCurrentUser } from "../auth/hooks";

/**
 *
 * @param params : params to be passed with the request
 * @returns
 */
export function useSchoolUsers(params: any) {
  const user = useCurrentUser();

  return useQuery({
    queryKey: [...UsersKeys.withSchool(user.school), params],
    queryFn: async () => getUsersInSchool(user.school, params),
  });
}

export function useUserDetailsQuery(userId: BaseUser["id"]) {
  const client = useAuthClient();
  const user = useCurrentUser();
  return useQuery({
    queryKey: UsersKeys.Details(userId),
    queryFn: async () => getUserInSchool(client, userId, user.school),
  });
}

/**
 * Hook to fetch subjects list
 */
export function useSubjects() {
  return useQuery({
    queryKey: UsersKeys.subjects,
    queryFn: getSubjects,
  });
}