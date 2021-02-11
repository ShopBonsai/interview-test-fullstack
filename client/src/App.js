import React from "react";
import { ApolloProvider } from "@apollo/client";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { createApolloClient } from "./createApolloClient";
import { ProductsList } from "./components/Products";
import { history } from "./helpers";

const App = () => {
  return (
    <ApolloProvider client={createApolloClient()}>
      <BrowserRouter history={history}>
        <Switch>
          <Route path="/" component={ProductsList} />
          <Route render={() => <Redirect to="/" />} />
        </Switch>
      </BrowserRouter>
    </ApolloProvider>
  );
};

export default App;
