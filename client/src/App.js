import React, { Component } from 'react'
import { Switch, Route } from "react-router-dom"
import { ApolloProvider } from 'react-apollo';
import apolloClient from './createApolloClient';
import Products from './components/Products';

import CheckOut from "../src/Pages/checkoutpage"
import Header from "../src/components/Header/header"

class App extends Component {
  render() {
    return (
      <ApolloProvider client={apolloClient}>
        <Header/>
        <Switch>
        <Route exact path = "/" component = {Products} />
        <Route path = "/checkout" component = {CheckOut} />
        </Switch>
      </ApolloProvider>
    )
  }
}

export default App;