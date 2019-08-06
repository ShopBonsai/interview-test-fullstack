import React, { Component } from 'react'
import { ApolloProvider } from 'react-apollo';
import apolloClient from './createApolloClient';

import Products from './components/Products';
import './styles/base/base.css';
import './styles/layout/main.css';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {

    }
  }

  render() {
    return (
      <ApolloProvider client={apolloClient}>
         <div className="site-wrapper">
          <main>
            <Products />
          </main>
         </div>
      </ApolloProvider>
    )
  }
}

export default App;