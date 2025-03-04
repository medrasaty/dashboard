import axios from "axios";
import { useAuthSession } from "./contexts";

export function useAuthClient() {
  const session = useAuthSession();

  return axios.create({
    baseURL: "http://localhost:8000",
    headers: {
      // authentication header
      Authorization: `TOKEN ${session.token}`,
    },
  });
}

export function useCurrentUser() {
  const session = useAuthSession();
  return session.user;
}
