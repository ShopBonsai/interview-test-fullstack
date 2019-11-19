import React from "react";
import { Switch, Route } from "react-router-dom";
import { ApolloProvider } from "react-apollo";
import apolloClient from "./createApolloClient";

import Products from "./Pages/productpage/Products";
import CheckOut from "./Pages/checkoutpage/checkoutpage";
import Header from "../src/components/Header/header";
import HomePage from "./Pages/homepage/homepage";
import ContactPage from "./Pages/contactpage/contact";

import { GlobalStyle } from "./global-styles";

class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={apolloClient}>
        <GlobalStyle />
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/products" component={Products} />
          <Route path="/contact" component={ContactPage} />
          <Route path="/checkout" component={CheckOut} />
        </Switch>
      </ApolloProvider>
    );
  }
}
export default App;
