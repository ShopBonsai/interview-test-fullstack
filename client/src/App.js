import React from "react";
import { ApolloProvider } from "@apollo/client";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import { createApolloClient } from "./createApolloClient";
import { NavHeader, ProductsList, Login } from "./components";
import { history } from "./helpers";

import "./tailwind.css";

const App = () => {
  return (
    <ApolloProvider client={createApolloClient()}>
      <BrowserRouter history={history}>
        <div className="bg-gray-50 h-screen oveflow-x-scroll">
          <NavHeader />

          <Switch>
            <Route path="/products" component={ProductsList} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={ProductsList} />
            <Route render={() => <Redirect to="/products" />} />
          </Switch>
        </div>
      </BrowserRouter>
    </ApolloProvider>
  );
};

export default App;
