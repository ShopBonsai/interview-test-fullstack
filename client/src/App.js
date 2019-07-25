import React, { Component } from 'react'
import { ApolloProvider } from 'react-apollo';
import apolloClient from './createApolloClient';
import Products from './components/Products';

class App extends Component {
  render() {
    return (
      <ApolloProvider client={apolloClient}>
        <Products />
      </ApolloProvider>
    )
  }
}

export default App;