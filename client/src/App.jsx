import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import apolloClient from './createApolloClient';
import Products from './components/Products/Products';
import { Header } from './components/Header/Header';
import { CartContextProvider } from './CartContextProvider';

const App = () => (
  <ApolloProvider client={apolloClient}>
    <CartContextProvider>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route path="/">
            <Products />
          </Route>
        </Switch>
      </BrowserRouter>
    </CartContextProvider>

  </ApolloProvider>
);

export default App;
