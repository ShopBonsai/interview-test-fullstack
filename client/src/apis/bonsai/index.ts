import { AUTH_LOGOUT_URL } from "./constants";

export const logout = async () =>
  fetch(AUTH_LOGOUT_URL, {
    method: "get",
    credentials: "include",
    redirect: "follow",
  });
