import React from "react";
import { ApolloProvider } from "@apollo/client";

import { createApolloClient } from "./createApolloClient";
import { ProductsList } from "./components/Products";

const App = () => {
  return (
    <ApolloProvider client={createApolloClient()}>
      <ProductsList />
    </ApolloProvider>
  );
};

export default App;
