import * as React from "react";
import { Switch, Route } from "react-router";
import { ApolloProvider } from "@apollo/client";

import { client } from "./apollo/client";
import UserApp from "./containers/UserApp";
import AdminApp from "./containers/AdminApp";

class App extends React.Component<any, any> {
  render() {
    return (
      <ApolloProvider client={client}>
        <Switch>
          <Route path="/admin" component={AdminApp} />
          <Route path="/" component={UserApp} />
        </Switch>
      </ApolloProvider>
    );
  }
}

export default App;
