import * as React from "react";

import { useApolloClient, useQuery } from "@apollo/client";

import Nav from "../../components/Nav";
import Products from "../../components/Products";
import { isLoggedInVar } from "../../apollo/variables";
import { LOGIN } from "../../apollo/operations/queries";

const App = () => {
  const client = useApolloClient();

  useQuery(LOGIN, {
    onCompleted(data) {
      isLoggedInVar(!!(data && data.me));
    },
  });

  return (
    <>
      <Nav />
      <Products />
    </>
  );
};

export default App;
