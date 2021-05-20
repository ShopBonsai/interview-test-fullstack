import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';
import apolloClient from './createApolloClient';
import { Products, Nav } from './components';

class App extends Component {
  render() {
    return (
			<ApolloProvider client={apolloClient}>
				<Nav />
				<Products />
			</ApolloProvider>
		);
  }
}

export default App;