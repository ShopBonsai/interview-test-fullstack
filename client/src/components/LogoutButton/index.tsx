import * as React from "react";

import { Button } from "reactstrap";
import { useApolloClient } from "@apollo/client";

import { isLoggedInVar } from "../../apollo/variables";
import { logout } from "../../apis/bonsai";

export const LoginButton: React.FC = () => {
  const client = useApolloClient();

  return (
    <Button
      type="button"
      onClick={() => {
        logout()
          .then(() => {
            client.cache.evict({ fieldName: "me" });
            client.cache.gc();
            isLoggedInVar(false);
          })
          .catch((err) => {
            console.log(err);
          });
      }}
    >
      Logout
    </Button>
  );
};

export default LoginButton;
