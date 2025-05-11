(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["chunks/[root of the server]__381d27._.js", {

"[externals]/node:async_hooks [external] (node:async_hooks, cjs)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: __turbopack_require_real__ } = __turbopack_context__;
{
const mod = __turbopack_external_require__("node:async_hooks", () => require("node:async_hooks"));

module.exports = mod;
}}),
"[externals]/node:buffer [external] (node:buffer, cjs)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: __turbopack_require_real__ } = __turbopack_context__;
{
const mod = __turbopack_external_require__("node:buffer", () => require("node:buffer"));

module.exports = mod;
}}),
"[project]/src/lib/routes.ts [middleware] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
/**
 * An array of routes taht are accessible to the public.
 * These routes do not require auth credentials
 * @returns {string[]}
 */ __turbopack_esm__({
    "DEFAULT_LOGIN_REDIRECT": (()=>DEFAULT_LOGIN_REDIRECT),
    "HOME_URL": (()=>HOME_URL),
    "LOGIN_URL": (()=>LOGIN_URL),
    "apiAuthPrefix": (()=>apiAuthPrefix),
    "authRoutes": (()=>authRoutes),
    "map": (()=>map),
    "publicRoutes": (()=>publicRoutes)
});
const publicRoutes = [
    "/"
];
const authRoutes = [
    "/login"
];
const apiAuthPrefix = "/api/auth";
const LOGIN_URL = "/login";
const HOME_URL = "/dashboard";
const DEFAULT_LOGIN_REDIRECT = HOME_URL;
const map = {
    login: LOGIN_URL,
    dashboard: "/dashboard"
};
}}),
"[project]/src/middleware.ts [middleware] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "config": (()=>config),
    "default": (()=>__TURBOPACK__default__export__)
});
(()=>{
    const e = new Error("Cannot find module '@features/auth/auth'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$routes$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/lib/routes.ts [middleware] (ecmascript)");
;
;
const __TURBOPACK__default__export__ = auth((req)=>{
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;
    const currentRoute = nextUrl.pathname;
    const isApiAuthRoute = currentRoute.includes(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$routes$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__.apiAuthPrefix);
    const isPublicRoute = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$routes$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__.publicRoutes.includes(currentRoute);
    const isAuthRoute = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$routes$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__.authRoutes.includes(currentRoute);
    if (isApiAuthRoute) {
        return null;
    }
    if (isAuthRoute) {
        if (isLoggedIn) {
            return Response.redirect(new URL(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$routes$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__.DEFAULT_LOGIN_REDIRECT, nextUrl));
        }
        return null;
    }
    if (!isLoggedIn && !isPublicRoute) {
        return Response.redirect(new URL(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$routes$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__.LOGIN_URL, nextUrl));
    }
    return null;
});
const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
        // Always run for API routes
        "/(api|trpc)(.*)"
    ]
};
}}),
}]);

//# sourceMappingURL=%5Broot%20of%20the%20server%5D__381d27._.js.map