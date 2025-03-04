"use client";
/**
 * create authenticated context , all children inside this context will have access to authenticated user credentials, display a loading page if if session is still being loadded, redi
 */

import { createContext, ReactNode, useContext } from "react";
import { BaseUser } from "./types";
import { useSession } from "next-auth/react";
import LoadingPage from "@/components/LoadingPage";

export interface AuthSession {
  user: BaseUser;
  token: string;
}

const AuthSessionContext = createContext<AuthSession | undefined>(undefined);

export interface AuthSessionProviderProps {
  children: ReactNode;
}

export const AuthSessionProvider = (props: AuthSessionProviderProps) => {
  const session = useSession();

  if (session.status === "loading") return <LoadingPage />;

  if (session.status == "authenticated") {
    return (
      <AuthSessionContext.Provider
        value={{
          // @ts-ignore
          user: session.data.user as BaseUser,
          // @ts-ignore
          token: session.data.user?.token,
        }}
      >
        {props.children}
      </AuthSessionContext.Provider>
    );
  }

  // user will automatically be directred to login page if not authenticated by auth middleware, just return null
  return null;
};

export function useAuthSession() {
  const session = useContext(AuthSessionContext);

  if (!session) {
    throw new Error("useAuthSession must be used withing AuthSessionProvider");
  }

  return session;
}
