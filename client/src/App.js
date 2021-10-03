import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import apolloClient from './graphql/createApolloClient';
import Header from './components/header/header.component';
import Checkout from './components/checkout/checkout.component';
import AppContextProvider from './contexts/AppContext';
import Login from './components/login/login.component';
import Products from './components/product/products.component';
import Orders from './pages/order';

const App = () => {
  return (
    <ApolloProvider client={apolloClient}>
      <AppContextProvider>
        <Header></Header>
        <Switch>
          <Route exact path="/" render={(props) => <Products {...props} />}></Route>
          <Route exact path="/checkout" render={(props) => <Checkout {...props} />}></Route>
          <Route exact path="/login" component={Login} />
          <Route exact path="/orders" component={Orders} />
        </Switch>
      </AppContextProvider>
    </ApolloProvider>
  );
};

export default App;
