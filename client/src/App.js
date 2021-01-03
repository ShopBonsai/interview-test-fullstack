import React, { Component } from 'react'
import { ApolloProvider } from 'react-apollo';
import apolloClient from './createApolloClient';
import Store from './pages/Store';
import Cart from './pages/Cart';
import NotFoundPage from './components/404';
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import store from "./store";
import './styles.css';

class App extends Component {
  render() {
    return (
      <ApolloProvider client={apolloClient}>
        <Provider store={store}>
          <Router>
            <Switch>
              <Route exact path="/" component={Store} />
              <Route exact path="/cart" component={Cart} />
              <Route component={NotFoundPage} />
            </Switch>
          </Router>
        </Provider>
      </ApolloProvider>
    )
  }
}

export default App;