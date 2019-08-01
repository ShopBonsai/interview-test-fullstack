import React, { Component } from 'react'
import { ApolloProvider } from 'react-apollo';
import apolloClient from './createApolloClient';
import Filters from './components/Filters';
import Products from './components/Products';
import './styles/base/base.css';
import './styles/layout/main.css';

class App extends Component {

  render() {
    return (
      <ApolloProvider client={apolloClient}>
         <div className="site-wrapper phone">
          <main>
            <Filters />
            <Products />
          </main>
         </div>
      </ApolloProvider>
    )
  }
}

export default App;