import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';
import apolloClient from './createApolloClient';
import Products from './components/Products';
import Header from './components/Header';

const App = () => {
  const [username, setUsername] = React.useState('');

  return (
    <ApolloProvider client={apolloClient}>
      <Header
        username={username}
        onUsernameInput={e => setUsername(e.target.value)}
      />

      <Products />
    </ApolloProvider>
  );
};

export default App;
