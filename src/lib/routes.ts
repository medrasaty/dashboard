/**
 * An array of routes taht are accessible to the public.
 * These routes do not require auth credentials
 * @returns {string[]}
 */
export const publicRoutes = ["/"];

/**
 * Routes that are used for authentication
 * These routes do not require auth credentials
 * @returns {string[]}
 */
export const authRoutes = ["/login"];

/**
 * The prefix for API authentication routes
 * Routes that start with this prefix are used for API authentication purposes
 * @returns {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * The default login page in this app, not the server
 */
export const LOGIN_URL = "/login";

/**
 * Home url
 * @returns {string}
 */
export const HOME_URL = "/dashboard";

/**
 * The default redirect path after successfull log in.
 * @returns {string}
 */
export const DEFAULT_LOGIN_REDIRECT = HOME_URL;

/**
 * Experimental
 * A universal object to access all paths in the application ,
 * it must serve as a source of truth for all path navigation
 */
export const map = {
  login: LOGIN_URL,
  dashboard: "/dashboard",
};
