import { useAuthClient } from "@features/auth/hooks";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AddNewUserFormType, UpdateUserFormType } from "./schema";
import { UsersKeys } from "./keys";
import { StudentMoreType, User } from "./types";
import {
  createUser,
  updateStudentMore,
  updateTeacherMore,
  updateUser,
} from "./requests";
import { toast } from "@/lib/toast";
import { BaseUser } from "../auth/types";

export default function useAddNewUserMutation() {
  const client = useAuthClient();
  const qc = useQueryClient();

  return useMutation({
    mutationKey: ["add_user"],

    mutationFn: async (data: AddNewUserFormType) => createUser(client, data),
    onSuccess: (data) => {
      toast.success("user created successfully");
      qc.setQueriesData(
        { queryKey: UsersKeys.all },
        (old: User[] | undefined) => {
          if (!old) return [data];
          return [data, ...old];
        }
      );
    },
    onError: () => {
      toast.error("failed creating user!");
    },
    onSettled: () => {
      qc.invalidateQueries({ queryKey: UsersKeys.all });
    },
  });
}

/**
 *
 * @returns
 */
export function useUpdateUserMutation() {
  const client = useAuthClient();
  const qc = useQueryClient();

  const mutationFn = async (data: Partial<UpdateUserFormType>) =>
    updateUser(client, data);

  return useMutation({
    // FIXME: replace key with standard UsersKeys.Mutate.Update(id)
    mutationKey: ["update_user"],
    mutationFn,
    onSuccess: (data) => {
      // use toast
      toast.success("user updated successfully");
      qc.setQueryData(UsersKeys.Details(data.id), (old: User | undefined) => {
        // merge info
        return {
          ...old,
          ...data,
        };
      });
    },
    onError: (_error) => {
      toast.error("failed updating user");
    },
    onSettled: (_data) => {
      qc.invalidateQueries({ queryKey: UsersKeys.all });
    },
  });
}

/**
 * Use it to update student more related objects.
 * just provide studentmore data without explicitly setting "studentmore": data,
 *  just pass data to mutate => mutate(data)
 * @returns
 */
export function useUpdateStudentMoreMutation(studentId: BaseUser["id"]) {
  const qc = useQueryClient();

  const mutationFn = async (data: Partial<StudentMoreType>) =>
    await updateStudentMore(studentId, data);

  return useMutation({
    mutationKey: UsersKeys.Mutate.Update(studentId),
    mutationFn,
    /**
     * Update studentmore section in student detail object
     * @param data
     */
    onSuccess: (data) => {
      toast.success("updated studentmore successfully");
      console.log({
        id: data.id,
        type: typeof data.id,
        value: UsersKeys.Details(data.id),
      });
      qc.setQueryData(UsersKeys.Details(data.id), (old: User) => {
        console.log(data);
        return {
          ...old,
          more: data.more,
        };
      });
    },
    onError: (_error) => {
      toast.error("failed updating user");
    },
    onSettled: (_data) => {
      console.log({ key: UsersKeys.Details(studentId) });
      qc.invalidateQueries({ queryKey: UsersKeys.Details(studentId) });
    },
  });
}

export function useUpdateTeacherMoreMutation(teacherId: BaseUser["id"]) {
  const qc = useQueryClient();

  const mutationFn = async (data: Partial<StudentMoreType>) =>
    await updateTeacherMore(teacherId, data);

  return useMutation({
    mutationKey: UsersKeys.Mutate.Update(teacherId),
    mutationFn,
    onSuccess: (data) => {
      toast.success("updated more successfully");
      qc.setQueryData(UsersKeys.Details(data.id), (old: User) => {
        return {
          ...old,
          more: data.more,
        };
      });
    },
    onError: (_error) => {
      toast.error("failed updating user");
    },
    onSettled: (_data) => {
      qc.invalidateQueries({ queryKey: UsersKeys.Details(teacherId) });
    },
  });
}
