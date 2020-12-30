import React, { Component } from 'react'
import { ApolloProvider } from 'react-apollo';
import apolloClient from './createApolloClient';
import Products from './components/Products';
import SearchBar from "./components/SearchBar";

class App extends Component {

  constructor() {
    super();

    this.state = {
        isSearching: false,
        searchText: '',
        searchType: ''
    }
  }

  componentDidMount() {
      window.addEventListener('searchChangeEvent', this.handleSearchChange.bind(this))
  }

  handleSearchChange(e) {
      const type = e.detail.type
      const text = (e.detail.text || '')

      if (['ALL', 'BRAND', 'PRODUCT', 'MERCHANT'].includes(type) && text.length > 3) {
          this.setState({
              searchText: text,
              searchType: type,
              isSearching: true
          })
      } else {
          this.setState({
              isSearching: false
          })
      }
  }

  render() {
    return (
      <ApolloProvider client={apolloClient}>
        <SearchBar />
        <Products
            isSearching={this.state.isSearching}
            searchText={this.state.searchText}
            searchType={this.state.searchType}
        />
      </ApolloProvider>
    )
  }
}

export default App;
