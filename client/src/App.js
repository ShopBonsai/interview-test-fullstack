import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import apolloClient from './createApolloClient';
import Header from './components/header/header.component';
import Checkout from './components/checkout/checkout.component';
import CartContextProvider from './CartContext';
import Login from './components/login/login.component';
import Orders from './components/orders/order.component';
import Products from './components/product/products.component';

const App = () => {
  return (
    <ApolloProvider client={apolloClient}>
      <CartContextProvider>
        <Header></Header>
        <Switch>
          <Route exact path="/" render={(props) => <Products {...props} />}></Route>
          <Route exact path="/checkout" render={(props) => <Checkout {...props} />}></Route>
          <Route exact path="/login" component={Login} />
          <Route exact path="/orders" component={Orders} />
        </Switch>
      </CartContextProvider>
    </ApolloProvider>
  );
};

export default App;
