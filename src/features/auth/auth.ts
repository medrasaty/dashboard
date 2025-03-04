import NextAuth from "next-auth";
/**
 * Next Auth Configuration
 */
import { LOGIN_URL } from "@/lib/routes";
import type { NextAuthConfig } from "next-auth";
import { Medrasaty } from "./providers";

export const config = {
  pages: {
    signIn: LOGIN_URL,
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },

    session({ session, token }) {
      if (token.user) {
        session.user = token.user;
      }
      return session;
    },
  },
  providers: [Medrasaty],

  session: {
    // 1 day max age
    maxAge: 24 * 60 * 60,
    strategy: "jwt",
  },
} satisfies NextAuthConfig;

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth(config);
