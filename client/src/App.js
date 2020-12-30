import React, { Component } from 'react'
import { ApolloProvider } from 'react-apollo';
import apolloClient from './createApolloClient';
import Products from './components/Products';
import SearchBar from "./components/SearchBar";

class App extends Component {
  render() {
    return (
      <ApolloProvider client={apolloClient}>
        <SearchBar />
        <Products />
      </ApolloProvider>
    )
  }
}

export default App;
