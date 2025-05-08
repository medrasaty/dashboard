import { BaseUser } from "../auth/types";

/**
 * Uniform place for users query keys management.
 *
 * Note: IDs that are passed are converted to Numbers to avoid recreating new keys
 * because of the type of id, for example ["users", 3] and ["users", "3"] are different
 * keys, which would cause problems in invalidating and updating queries. To prevent this,
 * all IDs passed are converted to Numbers.
 *
 * [AI-Generated]
 */
export const UsersKeys = {
  // Base key for all user-related queries
  all: ["users"] as const,

  /**
   * Generates a query key for users associated with a specific school.
   * @param schoolId - The ID of the school, which can be a string or a BaseUser's school type.
   * Converts the schoolId to a number to ensure consistent key generation.
   *
   * [AI-Generated]
   */
  withSchool: (schoolId: BaseUser["school"] | string) => [
    ...UsersKeys.all,
    Number(schoolId),
  ],

  /**
   * Generates a query key for fetching details of a specific user.
   * @param userId - The ID of the user, which can be a string or a BaseUser's id type.
   * Converts the userId to a number to ensure consistent key generation.
   *
   * [AI-Generated]
   */
  Details: (userId: BaseUser["id"] | string) => [
    ...UsersKeys.all,
    Number(userId),
  ],

  Mutate: {
    /**
     * Generates a query key for updating a specific user.
     * @param userId - The ID of the user, which can be a string or a BaseUser's id type.
     * Converts the userId to a number to ensure consistent key generation.
     *
     * [AI-Generated]
     */
    Update: (userId: BaseUser["id"] | string) => [
      ...UsersKeys.all,
      "update",
      Number(userId),
    ],
  },
  subjects: ["subjects"] as const,
};
