import { useCurrentUser } from "@/features/auth/hooks";
import UserForm from "./UserForm";
import {
  AddNewUserFormSchema,
  AddNewUserFormType,
  GenderEnum,
  UserTypeEnum,
} from "../../schema";
import useSubmitLoading from "@/hooks/useSubmitLoading";
import { useMemo } from "react";
import useAddNewUserMutation from "../../mutations";

export function CreateUserForm({ onSuccess }: { onSuccess: () => void }) {
  const user = useCurrentUser();

  const {
    isSubmitting,
    show: showLoading,
    hide: hideLoading,
  } = useSubmitLoading();

  const { mutate: create } = useAddNewUserMutation();

  const defaultValues = useMemo(
    () => ({
      name: "",
      father_name: "",
      grand_father_name: "",
      family_name: "",
      gender: GenderEnum.male,
      type: UserTypeEnum.student,
      email: "",
      school: user.school,
    }),
    [user]
  );
  const handleCancel = () => {
    hideLoading();
    onSuccess();
  };

  const handleSubmit = (data: AddNewUserFormType, setError: any) => {
    showLoading();
    create(data, {
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
      mode="create"
      schema={AddNewUserFormSchema}
      onCancel={handleCancel}
      isSubmitting={isSubmitting}
      defaultValues={defaultValues}
    />
  );
}
