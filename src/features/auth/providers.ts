import Credentials from "next-auth/providers/credentials";
import { t } from "i18next";
import { SignInSchema } from "./schema";
import { login } from "./requests";

export const Medrasaty = Credentials({
  credentials: {
    email: { label: t("Email"), type: "text" },
    password: { label: "Password", type: "password" },
  },
  /**
   *
   * @param credentials email and password
   * @returns user session "Session" or null
   */
  async authorize(credentials) {
    try {
      const validatedFields = SignInSchema.parse(credentials);
      const res = await login(validatedFields);
      // FIXME: use enum instead of this
      //
      if (res.user.type !== "ADMIN") {
        throw new Error("Only admins are allowed to login to dashboard!");
      }

      return {
        ...res.user,
        token: res.token,
      };
    } catch (error) {
      // both , parse and login errors will be catched and login will fail on both cases.
      // console.warn("Authentication faild!", JSON.stringify(error));
      return null;
    }
  },
});
