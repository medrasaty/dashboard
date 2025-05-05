import { BaseUser } from "../auth/types";

/**
 * Uniform place for users query keys management.
 *
 * Note: IDs that are passes is being converted to Numbers to avoid recreating new keys
 * because of the type of id, for example ["users", 3] and ["users", "3"] are different
 * keys, that would cause problems in invalidating and updating queries, so all
 * IDs passed are converted to Numbers
 *
 * TODO: refactor duplicate Number(value) calls, create a formating method
 * and call it before constructing keys, or find a better solution
 *
 */
export const UsersKeys = {
  all: ["users"] as const,

  withSchool: (schoolId: BaseUser["school"] | string) => [
    ...UsersKeys.all,
    Number(schoolId),
  ],

  Details: (userId: BaseUser["id"] | string) => [
    ...UsersKeys.all,
    Number(userId),
  ],

  Mutate: {
    Update: (userId: BaseUser["id"] | string) => [
      ...UsersKeys.all,
      "update",
      Number(userId),
    ],
  },
};
