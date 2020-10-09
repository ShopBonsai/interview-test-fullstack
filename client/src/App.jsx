import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter } from 'react-router-dom';
import apolloClient from './createApolloClient';
import Products from './components/Products/Products';

const App = () => (
  <ApolloProvider client={apolloClient}>
    <BrowserRouter>
      <Products />
    </BrowserRouter>
  </ApolloProvider>
);

export default App;
