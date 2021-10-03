import React from 'react';
import { Route, Switch, HashRouter as Router } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import apolloClient from './graphql/createApolloClient';
import Header from './components/header/header.component';
import AppContextProvider from './contexts/AppContext';
import Checkout from './pages/checkout';
import Orders from './pages/order';
import Products from './pages/products';
import Login from './pages/login';

const App = () => {
  return (
    <ApolloProvider client={apolloClient}>
      <AppContextProvider>
        <Router>
          <Header></Header>
          <Switch>
            <Route exact path="/">
              <Products />
            </Route>
            <Route exact path="/checkout">
              <Checkout />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/orders">
              <Orders />
            </Route>
          </Switch>
        </Router>
      </AppContextProvider>
    </ApolloProvider>
  );
};

export default App;
