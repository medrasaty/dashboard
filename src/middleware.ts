import { auth } from "@features/auth/auth";
import * as routes from "./lib/routes";

// @ts-expect-error
export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const currentRoute = req.nextUrl.pathname;

  const isApiAuthRoute = currentRoute.includes(routes.apiAuthPrefix);

  const isPublicRoute = routes.publicRoutes.includes(currentRoute);

  const isAuthRoute = routes.authRoutes.includes(currentRoute);

  if (isApiAuthRoute) {
    return null;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(routes.DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return null;
  }

  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL(routes.LOGIN_URL, nextUrl));
  }

  // If code reached this point, user is logged in, allow it to pass.
  return null;
});

/**
 * Clerk: https://clerk.com/docs/references/nextjs/clerk-middleware
 */
export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
