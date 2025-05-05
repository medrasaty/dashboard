"use client";
import { type ReactNode, createContext, useContext } from "react";
import type React from "react";
import UserDetailScreenSkeleton from "./screens/UserDetailSkeleton";
import { useUserDetailsQuery } from "./queries";

import { DetailedUser } from "./types";
import { notFound } from "next/navigation";
import { BaseUser } from "../auth/types";

export interface UserDetailApi {
  user: DetailedUser;
}

export const UserDetailContext = createContext<UserDetailApi | undefined>(
  undefined
);

export interface UserDetailProviderProps {
  /**
   * User identifier
   */
  id: BaseUser["id"];
  children: ReactNode;
}

export const UserDetailProvider = ({
  id,
  children,
}: UserDetailProviderProps) => {
  const { data: user, isLoading, error } = useUserDetailsQuery(id);

  if (isLoading) {
    return <UserDetailScreenSkeleton />;
  }

  if (error) {
    // trigger error.tsx page
    throw new Error("Request Faield");
  }

  if (!user) {
    // trigger not-found.tsx page
    throw notFound();
  }

  return (
    <UserDetailContext.Provider
      value={{
        user: user,
      }}
    >
      {children}
    </UserDetailContext.Provider>
  );
};

/**
 * Allow to access user object withing user detail page
 * @returns
 */
export const useUserDetails = () => {
  const value = useContext(UserDetailContext);
  if (!value) {
    throw new Error("useUserDetails must be used withing UserDetailProvider");
  }
  return value.user;
};
