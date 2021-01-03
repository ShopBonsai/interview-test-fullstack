import React, { Component } from 'react'
import { ApolloProvider } from 'react-apollo';
import apolloClient from '../createApolloClient';
import ProductsList from '../components/Products';

class Products extends Component {
  constructor(props){
    super(props);
    this.state = {};
  };

  render() {
    return (
      <ProductsList {...this.props} />
    )
  };
};

export default Products;