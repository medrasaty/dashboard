import { z } from "zod";

export enum GenderEnum {
  male = "M",
  female = "F",
}

export const UserTypeEnum = {
  student: "student",
  teacher: "teacher",
} as const;

export const AddNewUserFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  father_name: z.string().min(2, "Father's name must be at least 2 characters"),
  grand_father_name: z
    .string()
    .min(2, "Grandfather's name must be at least 2 characters"),
  family_name: z.string().min(2, "Family name must be at least 2 characters"),
  gender: z.enum([GenderEnum.male, GenderEnum.female]).default(GenderEnum.male),
  type: z
    .enum([UserTypeEnum.student, UserTypeEnum.teacher])
    .default(UserTypeEnum.student),
  email: z.string().email("Invalid email address"),
  // school field is hidden
  school: z.number(),
});

export type AddNewUserFormType = z.infer<typeof AddNewUserFormSchema>;

/**
 * Schema for updating base user data, it removes school field and added id field for user identification.
 */
export const UpdateUserFormSchema = AddNewUserFormSchema.pick({
  name: true,
  father_name: true,
  grand_father_name: true,
  family_name: true,
  gender: true,
  type: true,
  email: true,
}).extend({
  id: z.number(),
});

/**
 * Base Type for Updating base user fields
 */
export type UpdateUserFormType = z.infer<typeof UpdateUserFormSchema>;

/**
 * Full name schema
 */
export const FullNameSchema = UpdateUserFormSchema.pick({
  id: true,
  name: true,
  father_name: true,
  grand_father_name: true,
  family_name: true,
});

export type FullNameSchemaType = z.infer<typeof FullNameSchema>;

export const EmailSchema = UpdateUserFormSchema.pick({
  id: true,
  email: true,
});

export type EmailSchemaType = z.infer<typeof EmailSchema>;
