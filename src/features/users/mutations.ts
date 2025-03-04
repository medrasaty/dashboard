import { useAuthClient } from "@features/auth/hooks";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AddNewUserFormType, UpdateUserFormType } from "./schema";
import { UsersKeys } from "./keys";
import { User } from "./types";
import { BaseUser } from "../auth/types";

export default function useAddNewUserMutation() {
  const client = useAuthClient();
  const qc = useQueryClient();

  return useMutation({
    mutationKey: ["add_user"],

    mutationFn: async (data: AddNewUserFormType): Promise<User> => {
      // create either student or teacher based on the type
      const res = await client.request({
        method: "post",
        url: data.type === "teacher" ? "/teachers/" : "/students/",
        data,
      });

      return res.data;
    },

    onSuccess: (data) => {
      qc.setQueriesData(
        { queryKey: UsersKeys.all },
        (old: User[] | undefined) => {
          if (!old) return [data];
          return [data, ...old];
        }
      );
    },
    onSettled: () => {
      qc.invalidateQueries({ queryKey: UsersKeys.all });
    },
  });
}

export function useUpdateUserMutation() {
  const client = useAuthClient();
  const qc = useQueryClient();

  const mutationFn = async (
    data: Partial<UpdateUserFormType>
  ): Promise<BaseUser> => {
    const res = await client.request({
      // partial update
      method: "patch",
      url: `/users/${data.id}/`,
      data,
    });

    return res.data;
  };
  return useMutation({
    mutationKey: ["update_user"],
    mutationFn,
    onSuccess: (data) => {
      // use toast
      qc.setQueryData(UsersKeys.Details(data.id), (old: User | undefined) => {
        // merge info
        return {
          ...old,
          ...data,
        };
      });
    },
    onSettled: (data) => {
      qc.invalidateQueries({ queryKey: UsersKeys.all });
    },
  });
}
