import { makeVar } from "@apollo/client";

import { getCookie } from "../utils";

const isSignedIn = getCookie("isSignedIn");
export const isLoggedInVar = makeVar(isSignedIn === "true");
