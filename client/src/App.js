import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';
import apolloClient from './createApolloClient';
import Products from './components/Products';
import Header from './components/Header';

const App = () => {
  // const [username, setUsername] = React.useState('');

  /*
   * NOTE: Use lazy state initialization, since getting from localStorage
   * could be an expensive-ish operation.
   */
  const [username, setUsername] = React.useState(
    () => window.localStorage.getItem('username') || ''
  );

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
