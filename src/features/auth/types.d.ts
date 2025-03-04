export interface LoginCredentials {
  email: string;
  password: string;
}

export type UserTypes = "STUDENT" | "TEACHER" | "ADMIN" | "SYSTEM";

/**
 * Base user fields
 */
export interface BaseUser {
  id: number;
  pk: string;
  username: string;
  email: string;
  name: string;
  father_name: string;
  grand_father_name: string;
  family_name: string;
  full_name: string;
  short_name: string;
  type: string;
  school: number;
  gender: "M" | "F";
  date_joined: Date;
  profile_picture: string;
}

/**
 * Session returned by the server
 */
export interface Session {
  user: BaseUser;
  token: string;
}
