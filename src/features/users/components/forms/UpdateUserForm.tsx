import { useCurrentUser } from "@/features/auth/hooks";
import UserForm from "./UserForm";
import {
  AddNewUserFormSchema,
  AddNewUserFormType,
  GenderEnum,
  UpdateUserFormSchema,
  UpdateUserFormType,
  UserTypeEnum,
} from "../../schema";
import useSubmitLoading from "@/hooks/useSubmitLoading";
import { useMemo } from "react";
import useAddNewUserMutation, { useUpdateUserMutation } from "../../mutations";
import { DetailedUser } from "../../types";

export function UpdateUserForm({
  onSuccess,
  user,
}: {
  onSuccess: () => void;
  user: DetailedUser;
}) {
  const {
    isSubmitting,
    show: showLoading,
    hide: hideLoading,
  } = useSubmitLoading();

  const { mutate: update } = useUpdateUserMutation();

  const defaultValues = useMemo(
    () =>
      ({
        id: user.id,
        name: user.name,
        father_name: user.father_name,
        grand_father_name: user.grand_father_name,
        family_name: user.family_name,
        gender: user.gender == "M" ? GenderEnum.male : GenderEnum.female,
        type:
          user.type == "STUDENT" ? UserTypeEnum.student : UserTypeEnum.teacher,
        email: user.email,
      } satisfies UpdateUserFormType),
    [user]
  );
  const handleCancel = () => {
    hideLoading();
    onSuccess();
  };

  const handleSubmit = (data: AddNewUserFormType, setError: any) => {
    showLoading();
    update(data, {
      onSuccess: () => {
        onSuccess();
      },
      onError: (error) => {
        if (error?.response?.data?.email) {
          setError("email", {
            // @ts-ignore
            message: error?.response?.data?.email ?? null,
          });
        } else {
          alert("something wrong happend");
        }
      },
      onSettled: () => {
        hideLoading();
      },
    });
  };

  return (
    <UserForm
      onSubmit={handleSubmit}
      mode="update"
      schema={UpdateUserFormSchema}
      onCancel={handleCancel}
      isSubmitting={isSubmitting}
      defaultValues={defaultValues}
    />
  );
}
