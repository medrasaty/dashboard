import { useQuery } from "@tanstack/react-query";
import { getUserInSchool, getUsersInSchool } from "./requests";
import { BaseUser } from "../auth/types";
import { UsersKeys } from "./keys";
import { useAuthClient, useCurrentUser } from "../auth/hooks";

export function useSchoolUsers() {
  const client = useAuthClient();
  const user = useCurrentUser();

  return useQuery({
    queryKey: UsersKeys.withSchool(user.school),
    queryFn: async () => getUsersInSchool(client, user.school),
  });
}

export function useUserDetailsQuery(userId: BaseUser["id"]) {
  console.log({
    func_name: "useUserDetailsQuery",
    userId: userId,
    userIdType: typeof userId,
  });
  const client = useAuthClient();
  const user = useCurrentUser();
  return useQuery({
    queryKey: UsersKeys.Details(userId),
    queryFn: async () => getUserInSchool(client, userId, user.school),
  });
}
