import { Session } from "./types";
import { SignInSchema } from "./schema";
import { z } from "zod";
import { api } from "@/lib/network";
import { AxiosRequestConfig } from "axios";

export async function login(
  credentials: z.infer<typeof SignInSchema>
): Promise<Session> {
  const config = {
    method: "post",
    url: "/auth/login/",
    // use this instead of manually setting up 'Authorize' header., it will automatically encode credentials.
    auth: {
      username: credentials.email,
      password: credentials.password,
    },
  } satisfies AxiosRequestConfig;

  const res = await api.request<Session>(config);
  return res.data;
}
