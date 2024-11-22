export const HOST = import.meta.env.VITE_SERVER_URL || "http://localhost:8747/";
console.log(HOST)

export const AUTH_ROUTES = "api/auth";
export const SIGNUP_ROUTES = `${AUTH_ROUTES}/signup`
export const LOGIN_ROUTE = `${AUTH_ROUTES}/login`