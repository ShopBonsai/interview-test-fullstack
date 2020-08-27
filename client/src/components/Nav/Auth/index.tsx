import * as React from "react";

import { useApolloClient, useQuery } from "@apollo/client";

import { IS_LOGGED_IN } from "../../../apollo/operations/queries";
import LoginButton from "./LoginButton";
import LogoutButton from "../../LogoutButton";

export const Auth: React.FC = () => {
  const client = useApolloClient();

  const {
    data: { isLoggedIn },
  } = useQuery(IS_LOGGED_IN);

  return <div>{isLoggedIn ? <LogoutButton /> : <LoginButton />}</div>;
};

export default Auth;
