import axios from "axios";
import { getSession } from "next-auth/react";

/**
 * Interface for all requests made to medrasaty server
 */
export const api = axios.create({
  baseURL: process.env.API_BASE_URL,
});

/**
 * Client with auth credneitals used for all authenticated request to server backend.
 */
export async function Client() {
  const session = await getSession();

  return axios.create({
    baseURL: "http://localhost:8000",
    headers: {
      // authentication header
      Authorization: `TOKEN ${session?.user?.token}`,
    },
  });
}
